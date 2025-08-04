use contract::{
    IHelloStarknetDispatcher, IHelloStarknetDispatcherTrait, IHelloStarknetSafeDispatcher,
    IHelloStarknetSafeDispatcherTrait, IProfileSystemDispatcher, IProfileSystemDispatcherTrait,
};
use core::array::ArrayTrait;
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::ContractAddress;

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_increase_balance() {
    let contract_address = deploy_contract("HelloStarknet");
    let dispatcher = IHelloStarknetDispatcher { contract_address };

    let balance_before = dispatcher.get_balance();
    assert(balance_before == 0, 'Invalid balance');

    dispatcher.increase_balance(42);

    let balance_after = dispatcher.get_balance();
    assert(balance_after == 42, 'Invalid balance');
}

#[test]
#[feature("safe_dispatcher")]
fn test_cannot_increase_balance_with_zero_value() {
    let contract_address = deploy_contract("HelloStarknet");
    let safe_dispatcher = IHelloStarknetSafeDispatcher { contract_address };

    let balance_before = safe_dispatcher.get_balance().unwrap();
    assert(balance_before == 0, 'Invalid balance');

    match safe_dispatcher.increase_balance(0) {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => {
            assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
        },
    };
}
// #[test]
// fn test_set_and_get_profile() {
//     let contract_address = deploy_contract("ProfileSystem");

//     let dispatcher = IProfileSystemDispatcher { contract_address };

//     // Set a profile
//     dispatcher.set_profile("user1", "John Doe", "http://example.com/johndoe.jpg");

//     // Retrieve the profile
//     let (name, profile_pic_url) = dispatcher.get_profile("user1");

//     // Assert that the retrieved profile matches the set values
//     assert(name == "John Doe", 'Name should match');
//     assert(profile_pic_url == "http://example.com/johndoe.jpg", 'Profile picture URL should
//     match');
// }

#[test]
fn test_set_and_get_profile() {
    let contract_address = deploy_contract("ProfileSystem");
    let dispatcher = IProfileSystemDispatcher { contract_address };

    // Set a profile - using shorter URL to fit in felt252
    dispatcher.set_profile('user1', 'John Doe', 'example.com/profile.jpg');

    // Retrieve the profile
    let (name, profile_pic_url) = dispatcher.get_profile('user1');

    // Assert that the retrieved profile matches the set values
    assert(name == 'John Doe', 'Name should match');
    assert(profile_pic_url == 'example.com/profile.jpg', 'URL should match');
}
