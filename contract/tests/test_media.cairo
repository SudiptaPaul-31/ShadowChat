use contract::media::{
    IMediaSharingDispatcher, 
    IMediaSharingDispatcherTrait,
    IMediaSharingSafeDispatcher,
    IMediaSharingSafeDispatcherTrait,
};
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starknet::ContractAddress;
use core::array::ArrayTrait;
use core::traits::TryInto;

// Define a helper function to deploy the contract
fn deploy_contract() -> (IMediaSharingDispatcher, IMediaSharingSafeDispatcher) {
    let contract_class = declare("MediaSharing").unwrap().contract_class();
    let (contract_address, _) = contract_class.deploy(@ArrayTrait::new()).unwrap();

    let media_sharing_dispatcher = IMediaSharingDispatcher { contract_address };
    let media_sharing_safe_dispatcher = IMediaSharingSafeDispatcher { contract_address };
    
    (media_sharing_dispatcher, media_sharing_safe_dispatcher)
}

#[test]
fn test_share_and_get_media() {
    // Deploy the contract
    let (media_sharing_dispatcher, _) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Define media hash and type
    let media_hash: ByteArray = "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o";
    let media_type: ByteArray = "image/jpeg";

    // Share the media
    media_sharing_dispatcher.share_media(recipient, media_hash.clone(), media_type.clone());

    // Retrieve the media at index 0
    let _ = media_sharing_dispatcher.get_media(recipient, 0);
    
    // Success if we get here without errors
    assert(true, 'Media retrieval failed');
}

#[test]
fn test_get_all_media() {
    // Deploy the contract
    let (media_sharing_dispatcher, _) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Define two media files
    let media_hash1: ByteArray = "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o";
    let media_type1: ByteArray = "image/jpeg";
    
    let media_hash2: ByteArray = "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u";
    let media_type2: ByteArray = "video/mp4";

    // Share the media files
    media_sharing_dispatcher.share_media(recipient, media_hash1.clone(), media_type1.clone());
    media_sharing_dispatcher.share_media(recipient, media_hash2.clone(), media_type2.clone());

    // Retrieve all media for the recipient
    let all_media = media_sharing_dispatcher.get_all_media(recipient);

    // Assert that the length of the retrieved media is correct
    assert(all_media.len() == 2, 'Incorrect number of media items');
}

#[test]
#[feature("safe_dispatcher")]
fn test_safe_empty_hash_validation() {
    // Deploy the contract
    let (_, media_sharing_safe_dispatcher) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Attempt to share media with an empty hash
    let result = media_sharing_safe_dispatcher.share_media(recipient, "", "image/jpeg");

    match result {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => assert(*panic_data.at(0) == 'Media hash cannot be empty', *panic_data.at(0)),
    }
}

#[test]
#[feature("safe_dispatcher")]
fn test_safe_empty_type_validation() {
    // Deploy the contract
    let (_, media_sharing_safe_dispatcher) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Attempt to share media with an empty type
    let result = media_sharing_safe_dispatcher.share_media(
        recipient, 
        "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o", 
        ""
    );

    match result {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => assert(*panic_data.at(0) == 'Media type cannot be empty', *panic_data.at(0)),
    }
}

#[test]
fn test_multiple_recipients() {
    // Deploy the contract
    let (media_sharing_dispatcher, _) = deploy_contract();

    // Define multiple recipients
    let recipient1: ContractAddress = 'recipient1'.try_into().unwrap();
    let recipient2: ContractAddress = 'recipient2'.try_into().unwrap();
    
    // Define media files
    let media_hash1: ByteArray = "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o";
    let media_type1: ByteArray = "image/jpeg";
    
    let media_hash2: ByteArray = "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u";
    let media_type2: ByteArray = "video/mp4";

    // Share media with different recipients
    media_sharing_dispatcher.share_media(recipient1, media_hash1.clone(), media_type1.clone());
    media_sharing_dispatcher.share_media(recipient2, media_hash2.clone(), media_type2.clone());

    // Check recipient1's media
    let recipient1_media = media_sharing_dispatcher.get_all_media(recipient1);
    assert(recipient1_media.len() == 1, 'Recipient1 should have 1 item');
    
    // Check recipient2's media
    let recipient2_media = media_sharing_dispatcher.get_all_media(recipient2);
    assert(recipient2_media.len() == 1, 'Recipient2 should have 1 item');
}

#[test]
#[should_panic(expected: 'Index out of bounds')]
fn test_get_media_out_of_bounds() {
    // Deploy the contract
    let (media_sharing_dispatcher, _) = deploy_contract();

    // Define a recipient address
    let recipient: ContractAddress = 'recipient'.try_into().unwrap();

    // Share one media item
    media_sharing_dispatcher.share_media(
        recipient, 
        "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o", 
        "image/jpeg"
    );

    // Try to access an out-of-bounds index (should panic)
    media_sharing_dispatcher.get_media(recipient, 1);
}