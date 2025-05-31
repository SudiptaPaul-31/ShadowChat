use core::array::{Array, ArrayTrait};
use starknet::ContractAddress;
use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
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
    use super::{IMessageStorage};
    use core::array::{Array, ArrayTrait};
    use starknet::ContractAddress;
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::ByteArray;

    #[storage]
    struct Storage {
        messages: Map<(ContractAddress, u64), ByteArray>,
        message_counter: Map<ContractAddress, u64>,
    }

    #[abi(embed_v0)]
    impl MessageStorageImpl of IMessageStorage<ContractState> {
        fn store_message(ref self: ContractState, recipient: ContractAddress, message: ByteArray) {
            assert(message.len() != 0, 'Message cannot be empty');

            let index = self.message_counter.read(recipient);
            self.messages.write((recipient, index), message);
            self.message_counter.write(recipient, index + 1);
        }

        fn get_message(self: @ContractState, recipient: ContractAddress, index: u64) -> ByteArray {
            let total_messages = self.message_counter.read(recipient);
            assert(index < total_messages, 'Index out of bounds');
            self.messages.read((recipient, index))
        }

        fn get_all_messages(self: @ContractState, recipient: ContractAddress) -> Array<ByteArray> {
            let total = self.message_counter.read(recipient);
            let mut result: Array<ByteArray> = ArrayTrait::new();
            let mut i: u64 = 0;

            while i < total {
                result.append(self.messages.read((recipient, i)));
                i += 1;
            }

            result
        }

        fn delete_message(ref self: ContractState, recipient: ContractAddress, index: u64) {
            let total = self.message_counter.read(recipient);
            assert(index < total, 'Invalid index');

            // Shift all subsequent messages back
            let mut i = index;
            while i + 1 < total {
                let next = self.messages.read((recipient, i + 1));
                self.messages.write((recipient, i), next);
                i += 1;
            }

            // Remove last message
            self.messages.write((recipient, total - 1), ByteArray::new());
            self.message_counter.write(recipient, total - 1);
        }

        fn delete_all_messages(ref self: ContractState, recipient: ContractAddress) {
            let total = self.message_counter.read(recipient);
            let mut i: u64 = 0;

            while i < total {
                self.messages.write((recipient, i), ByteArray::new());
                i += 1;
            }

            self.message_counter.write(recipient, 0);
        }
    }
}
