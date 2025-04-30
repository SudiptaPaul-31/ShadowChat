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
        Map,  
        StoragePointerReadAccess,
        StoragePathEntry, 
        MutableVecTrait, 
        Vec, 
        VecTrait
    };
    use core::array::{Array, ArrayTrait};
    use super::IMessageStorage;

    // Define storage variables
    #[storage]
    struct Storage {
        messages: Map::<ContractAddress, Vec<ByteArray>>,
    }

    // Implement the contract interface
    #[abi(embed_v0)]
    impl MessageStorageImpl of IMessageStorage<ContractState> {
        // Store a message
        fn store_message(ref self: ContractState, recipient: ContractAddress, message: ByteArray) {
            // Check if message is empty
            assert(message.len() != 0, 'Message cannot be empty');
            
            let recipient_messages = self.messages.entry(recipient);

            // Append the message to the recipient's message vector
            recipient_messages.push(message);

            // Update the storage with the new message vector
            // self.messages.entry(recipient).write(recipient_messages);
        }

        // Get a specific message
        fn get_message(self: @ContractState, recipient: ContractAddress, index: u64) -> ByteArray {
            let recipient_messages = self.messages.entry(recipient);

            recipient_messages.at(index).read()
        }

        // Get all messages for a recipient
        fn get_all_messages(self: @ContractState, recipient: ContractAddress) -> Array<ByteArray> {
            // Retrieve the messages for the recipient
            let recipient_messages = self.messages.entry(recipient);

            // Create a new array to store the messages
            let mut messages: Array<ByteArray> = ArrayTrait::new();

            // Iterate through the recipient's messages and append them to the array
            let mut i = 0;
            while i != recipient_messages.len() {
                messages.append(recipient_messages.at(i).read());
                i += 1;
            };

            // Return the array of messages
            messages
        }
    }
}
