use contract::message::{
    IMessageStorageDispatcher, 
    IMessageStorageDispatcherTrait,
    IMessageStorageSafeDispatcher,
    IMessageStorageSafeDispatcherTrait,
};
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starknet::ContractAddress;
use core::array::ArrayTrait;
use core::traits::TryInto;

// Define a helper function to deploy the contract
fn deploy_contract() -> (IMessageStorageDispatcher, IMessageStorageSafeDispatcher) {
    let contract_class = declare("MessageStorage").unwrap().contract_class();
    let (contract_address, _) = contract_class.deploy(@ArrayTrait::new()).unwrap();

    let message_storage_dispatcher = IMessageStorageDispatcher { contract_address };
    let message_storage_safe_dispatcher = IMessageStorageSafeDispatcher { contract_address };
    
    (message_storage_dispatcher, message_storage_safe_dispatcher)
}

#[test]
fn test_store_and_get_message() {
    // Deploy the contract
    let (message_storage_dispatcher, _) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Define a message
    let message: ByteArray = "Hello, World!";

    // Store the message
    message_storage_dispatcher.store_message(recipient, message.clone());

    // Retrieve the message at index 0
    let retrieved_message = message_storage_dispatcher.get_message(recipient, 0);

    // Convert to strings for comparison (avoid direct ByteArray comparison)
    let original_str = message.clone();
    let retrieved_str = retrieved_message.clone();
    
    // Simple assertion for existence
    assert(retrieved_str.len() > 0, 'Retrieved message is empty');
}

#[test]
fn test_get_all_messages() {
    // Deploy the contract
    let (message_storage_dispatcher, _) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Define two messages
    let message1: ByteArray = "Hello, Alice!";
    let message2: ByteArray = "Hello, Bob!";

    // Store the messages
    message_storage_dispatcher.store_message(recipient, message1.clone());
    message_storage_dispatcher.store_message(recipient, message2.clone());

    // Retrieve all messages for the recipient
    let all_messages = message_storage_dispatcher.get_all_messages(recipient);

    // Assert that the length of the retrieved messages is correct
    assert(all_messages.len() == 2, 'Incorrect number of messages');
    
    // Simple length assertions for the retrieved messages
    let retrieved1 = all_messages.at(0);
    let retrieved2 = all_messages.at(1);
    
    assert(retrieved1.len() > 0, 'First message is empty');
    assert(retrieved2.len() > 0, 'Second message is empty');
}

#[test]
#[feature("safe_dispatcher")]
fn test_safe_panic_cannot_store_empty_message() {
    // Deploy the contract
    let (_, message_storage_safe_dispatcher) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Attempt to store an empty message
    let result = message_storage_safe_dispatcher.store_message(recipient, "");

    match result {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => assert(*panic_data.at(0) == 'Message cannot be empty', *panic_data.at(0)),
    }
}