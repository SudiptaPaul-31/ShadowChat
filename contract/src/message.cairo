use starknet::ContractAddress;
use core::array::Array;

// Define the contract interface
#[starknet::interface]
pub trait IMessageStorage<TContractState> {
    fn store_message(ref self: TContractState, recipient: ContractAddress, message: ByteArray);
    fn get_message(self: @TContractState, recipient: ContractAddress, index: u64) -> ByteArray;
    fn get_all_messages(self: @TContractState, recipient: ContractAddress) -> Array<ByteArray>;
}

// Define the contract module
#[starknet::contract]
pub mod MessageStorage {
    use starknet::ContractAddress;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess
    };
    use core::array::{Array, ArrayTrait};
    use super::IMessageStorage;

    // Define storage variables
    #[storage]
    struct Storage {
        messages: Map::<(ContractAddress, u64), ByteArray>,
        message_counter: Map::<ContractAddress, u64>,
    }

    // Implement the contract interface
    #[abi(embed_v0)]
    impl MessageStorageImpl of IMessageStorage<ContractState> {
        // Store a message
        fn store_message(ref self: ContractState, recipient: ContractAddress, message: ByteArray) {
            // Check if message is empty
            assert(message.len() != 0, 'Message cannot be empty');
            
            // Get the current counter for the recipient
            let current_index = self.message_counter.read(recipient);
            
            // Store the message
            self.messages.write((recipient, current_index), message);
            
            // Increment the counter
            self.message_counter.write(recipient, current_index + 1);
        }

        // Get a specific message
        fn get_message(self: @ContractState, recipient: ContractAddress, index: u64) -> ByteArray {
            // Check if the index is valid
            let total_messages = self.message_counter.read(recipient);
            assert(index < total_messages, 'Index out of bounds');
            
            // Return the message
            self.messages.read((recipient, index))
        }

        // Get all messages for a recipient
        fn get_all_messages(self: @ContractState, recipient: ContractAddress) -> Array<ByteArray> {
            // Get the total number of messages for the recipient
            let total_messages = self.message_counter.read(recipient);
            
            // Create a new array to store the messages
            let mut messages: Array<ByteArray> = ArrayTrait::new();
            
            // Iterate through the recipient's messages and append them to the array
            let mut i: u64 = 0;
            while i < total_messages {
                messages.append(self.messages.read((recipient, i)));
                i += 1;
            };
            
            // Return the array of messages
            messages
        }
    }
}