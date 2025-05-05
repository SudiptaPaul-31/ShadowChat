use core::array::Array;
use starknet::ContractAddress;

#[starknet::interface]
pub trait IMessageStorage<TContractState> {
    fn store_message(ref self: TContractState, recipient: ContractAddress, message: ByteArray);
    fn get_message(self: @TContractState, recipient: ContractAddress, index: u64) -> ByteArray;
    fn get_all_messages(self: @TContractState, recipient: ContractAddress) -> Array<ByteArray>;
    fn delete_message(ref self: TContractState, recipient: ContractAddress, index: u64);
    fn delete_all_messages(ref self: TContractState, recipient: ContractAddress);
}

#[starknet::contract]
pub mod MessageStorage {
    use core::array::{Array, ArrayTrait};
    use starknet::ContractAddress;
    use starknet::storage::{Map, StorageMapAccess, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        // Fixed: Use single consistent storage structure
        messages: Map<(ContractAddress, u64), ByteArray>,
        message_counter: Map<ContractAddress, u64>,
    }

    #[abi(embed_v0)]
    impl MessageStorageImpl of IMessageStorage<ContractState> {
        fn store_message(ref self: ContractState, recipient: ContractAddress, message: ByteArray) {
            assert(message.len() != 0, 'Message cannot be empty');
            
            let current_index = self.message_counter.read(recipient);
            self.messages.write((recipient, current_index), message);
            self.message_counter.write(recipient, current_index + 1);
        }

        fn get_message(self: @ContractState, recipient: ContractAddress, index: u64) -> ByteArray {
            let total_messages = self.message_counter.read(recipient);
            assert(index < total_messages, 'Index out of bounds');
            self.messages.read((recipient, index))
        }

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

        fn delete_all_messages(ref self: ContractState, recipient: ContractAddress) {
            let mut i = 0;
            let total_messages = self.message_counter.read(recipient);
            while i < total_messages {
                self.messages.remove((recipient, i));
                i += 1;
            }
            self.message_counter.remove(recipient);
        }
    }
}

// Profile system remains unchanged