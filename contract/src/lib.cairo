/// Interface representing `HelloContract`.
/// This interface allows modification and retrieval of the contract balance.
#[starknet::interface]
pub trait IHelloStarknet<TContractState> {
    /// Increase contract balance.
    fn increase_balance(ref self: TContractState, amount: felt252);
    /// Retrieve contract balance.
    fn get_balance(self: @TContractState) -> felt252;
}

/// Simple contract for managing balance.
#[starknet::contract]
mod HelloStarknet {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        balance: felt252,
    }

    #[abi(embed_v0)]
    impl HelloStarknetImpl of super::IHelloStarknet<ContractState> {
        fn increase_balance(ref self: ContractState, amount: felt252) {
            assert(amount != 0, 'Amount cannot be 0');
            self.balance.write(self.balance.read() + amount);
        }

        fn get_balance(self: @ContractState) -> felt252 {
            self.balance.read()
        }
    }
}

pub mod message;
pub mod media;

// Interface for the Profile System is defined in a separate module
#[starknet::interface]
pub trait IProfileSystem<TContractState> {
    fn set_profile(ref self: TContractState, username: felt252, name: felt252, profile_pic_url: felt252);
    fn get_profile(self: @TContractState, username: felt252) -> (felt252, felt252);
}

// Profile System contract implementation
#[starknet::contract]
mod ProfileSystem {
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess
    };

    #[storage]
    struct Storage {
        profiles: Map::<felt252, (felt252, felt252)>,
    }

    #[abi(embed_v0)]
    impl ProfileSystemImpl of super::IProfileSystem<ContractState> {
        fn set_profile(ref self: ContractState, username: felt252, name: felt252, profile_pic_url: felt252) {
            // Store the profile information
            self.profiles.write(username, (name, profile_pic_url));
        }

        fn get_profile(self: @ContractState, username: felt252) -> (felt252, felt252) {
            // Retrieve the profile information
            self.profiles.read(username)
        }
    }
}