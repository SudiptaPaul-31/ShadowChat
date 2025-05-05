use core::array::Array;
use starknet::ContractAddress;
use starknet::ByteArray;

// Define the contract interface
#[starknet::interface]
pub trait IMessageStorage<TContractState> {
    fn store_message(ref self: TContractState, recipient: ContractAddress, message: ByteArray);
    fn get_message(self: @TContractState, recipient: ContractAddress, index: u64) -> ByteArray;
    fn get_all_messages(self: @TContractState, recipient: ContractAddress) -> Array<ByteArray>;
    fn delete_message(ref self: TContractState, recipient: ContractAddress, index: u64);
    fn delete_all_messages(ref self: TContractState, recipient: ContractAddress);
}

// Define the contract module
#[starknet::contract]
pub mod MessageStorage {
    use super::{IMessageStorage, ByteArray, ContractAddress};
    use core::array::{Array, ArrayTrait};
    use starknet::storage::StorageMapAccess;

    // Define storage variables
    #[storage]
    struct Storage {
        messages: Map<(ContractAddress, u64), ByteArray>,
        message_counter: Map<ContractAddress, u64>,
    }

    // Implement the contract interface
    #[abi(embed_v0)]
    impl MessageStorageImpl of IMessageStorage<ContractState> {
        // Store a message
        fn store_message(ref self: ContractState, recipient: ContractAddress, message: ByteArray) {
            assert(message.len() != 0, 'Message cannot be empty');
            
            let current_index = self.message_counter.read(recipient);
            self.messages.write((recipient, current_index), message);
            self.message_counter.write(recipient, current_index + 1);
        }

        // Get a specific message
        fn get_message(self: @ContractState, recipient: ContractAddress, index: u64) -> ByteArray {
            let total_messages = self.message_counter.read(recipient);
            assert(index < total_messages, 'Index out of bounds');
            
            self.messages.read((recipient, index))
        }

        // Get all messages for a recipient
        fn get_all_messages(self: @ContractState, recipient: ContractAddress) -> Array<ByteArray> {
            let total_messages = self.message_counter.read(recipient);
            let mut messages = ArrayTrait::new();
            
            let mut i: u64 = 0;
            while i < total_messages {
                messages.append(self.messages.read((recipient, i)));
                i += 1;
            }
            
            messages
        }

        // Delete a specific message by index
        fn delete_message(ref self: ContractState, recipient: ContractAddress, index: u64) {
            let total_messages = self.message_counter.read(recipient);
            assert(index < total_messages, 'Invalid message index');
            
            // Shift subsequent messages
            let mut i = index;
            while i < total_messages - 1 {
                let next_message = self.messages.read((recipient, i + 1));
                self.messages.write((recipient, i), next_message);
                i += 1;
            }
            
            // Remove last entry and update counter
            self.messages.remove((recipient, total_messages - 1));
            self.message_counter.write(recipient, total_messages - 1);
        }

        // Delete all messages for a recipient
        fn delete_all_messages(ref self: ContractState, recipient: ContractAddress) {
            let total_messages = self.message_counter.read(recipient);
            let mut i = 0;
            while i < total_messages {
                self.messages.remove((recipient, i));
                i += 1;
            }
            self.message_counter.remove(recipient);
        }
    }
}