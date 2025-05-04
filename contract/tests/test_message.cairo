use contract::message::{
    IMessageStorageDispatcher, IMessageStorageDispatcherTrait, IMessageStorageSafeDispatcher,
    IMessageStorageSafeDispatcherTrait,
};
use core::array::ArrayTrait;
use core::traits::TryInto;
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::ContractAddress;

// Define a helper function to deploy the contract
fn deploy_contract() -> (IMessageStorageDispatcher, IMessageStorageSafeDispatcher) {
    let contract_class = declare("MessageStorage").unwrap().contract_class();

    let (contract_address, _) = contract_class.deploy(@array![]).unwrap();

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

    // Define a message as an array of felt252
    let message: ByteArray = "Hello, World!";

    // Store the message
    message_storage_dispatcher.store_message(recipient, message.clone());

    // Retrieve the message at index 0
    let retrieved_message = message_storage_dispatcher.get_message(recipient, 0);

    // Assert that the retrieved message is equal to the first element of the original message
    assert(retrieved_message == message, 'Retrieved message should match');
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

    // Assert that the messages are retrieved in the correct order
    assert(all_messages.at(0) == @message1, 'First message should match');
    assert(all_messages.at(1) == @message2, 'Second message should match');
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
        Result::Err(panic_data) => assert(
            *panic_data.at(0) == 'Message cannot be empty', *panic_data.at(0),
        ),
    }
}

#[test]
fn test_message_edit_message_success() {
    let (dispatcher, _) = deploy_contract();
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();
    let test_message = "Test Message";
    let edit = "Edited Message";

    for _ in 0..4_u32 {
        dispatcher.store_message(recipient, test_message.clone());
    }
    let index = 2;
    let message = dispatcher.get_message(recipient, index);
    assert(message == test_message, 'STORAGE FAILED');

    // edit message at index
    dispatcher.edit_message(recipient, index, edit.clone());
    let message = dispatcher.get_message(recipient, index);
    assert(message == edit, 'EDIT FAILED');
}
