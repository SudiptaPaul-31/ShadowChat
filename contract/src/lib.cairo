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
// NOTE: ALREADY IN THE MESSAGE MODULE!!!

// // Define a new trait for the Profile System
// pub trait IProfileSystem<TContractState> {
//     fn set_profile(
//         ref self: TContractState, username: felt252, name: felt252, profile_pic_url: felt252,
//     );
//     fn get_profile(self: @TContractState, username: felt252) -> (felt252, felt252);
// }

// // Implement the Profile System
// #[abi(embed_v0)]
// impl ProfileSystemImpl of IProfileSystem<ContractState> {
//     fn set_profile(
//         ref self: ContractState, username: felt252, name: felt252, profile_pic_url: felt252,
//     ) {// Logic to set user profile
//     }

//     fn get_profile(self: @ContractState, username: felt252) -> (felt252, felt252) {
//         // Logic to get user profile
//         ("", "") // Placeholder return
//     }
// }


