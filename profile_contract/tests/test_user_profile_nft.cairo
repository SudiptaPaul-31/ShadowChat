#[cfg(test)]
mod user_profile_nft_tests {
    use core::array::ArrayTrait;
    use core::option::OptionTrait;
    use core::result::ResultTrait;
    use core::traits::Into;
    use starknet::ContractAddress;
    use starknet::testing::{set_block_timestamp, set_caller_address, set_contract_address};

    // Import the contract module
    use user_profile_nft::user_profile_nft::UserProfileNFT;
    use user_profile_nft::user_profile_nft::UserProfileNFT::{
        ContractState, Event, ProfileCreated, ProfileUpdated, UserProfile,
    };

    // Test constants
    const OWNER: felt252 = 0x123;
    const USER1: felt252 = 0x456;
    const USER2: felt252 = 0x789;

    // Test setup function to deploy a new contract instance
    fn setup() -> ContractState {
        // Set block timestamp for deterministic tests
        set_block_timestamp(1000);

        // Create contract with owner
        let mut state = UserProfileNFT::contract_state_for_testing();
        let owner: ContractAddress = OWNER.try_into().unwrap();
        let base_uri: ByteArray = "https://example.com/api/";

        // Call constructor
        UserProfileNFT::constructor(ref state, owner, base_uri);

        state
    }

    // Test: Create profile
    #[test]
    fn test_create_profile() {
        // Setup
        let mut state = setup();

        // Set caller address to USER1
        let user1: ContractAddress = USER1.try_into().unwrap();
        set_caller_address(user1);

        // Create profile
        let username: ByteArray = "user1";
        let ipfs_hash: ByteArray = "QmHashForUser1";
        let token_id = UserProfileNFT::ExternalImpl::create_profile(ref state, username, ipfs_hash);

        // Check that token_id is 1 (first token)
        assert(token_id == 1, 'Token ID should be 1');

        // Check that the user has a profile
        let has_profile = UserProfileNFT::ExternalImpl::has_profile(@state, user1);
        assert(has_profile == true, 'User should have a profile');

        // Check profile data
        let profile = UserProfileNFT::ExternalImpl::get_profile_by_token_id(@state, token_id);
        assert(profile.username == username, 'Username mismatch');
        assert(profile.wallet_address == user1, 'Wallet address mismatch');
        assert(profile.ipfs_hash == ipfs_hash, 'IPFS hash mismatch');
        assert(profile.created_at == 1000, 'Created timestamp mismatch');
        assert(profile.updated_at == 1000, 'Updated timestamp mismatch');
    }

    // Test: Get profile by address
    #[test]
    fn test_get_profile_by_address() {
        // Setup
        let mut state = setup();

        // Create a profile for USER1
        let user1: ContractAddress = USER1.try_into().unwrap();
        set_caller_address(user1);
        let username: ByteArray = "user1";
        let ipfs_hash: ByteArray = "QmHashForUser1";
        let token_id = UserProfileNFT::ExternalImpl::create_profile(ref state, username, ipfs_hash);

        // Get profile by address
        let profile = UserProfileNFT::ExternalImpl::get_profile_by_address(@state, user1);

        // Check profile data
        assert(profile.username == username, 'Username mismatch');
        assert(profile.wallet_address == user1, 'Wallet address mismatch');
        assert(profile.ipfs_hash == ipfs_hash, 'IPFS hash mismatch');
    }

    // Test: Get token ID by address
    #[test]
    fn test_get_token_id_by_address() {
        // Setup
        let mut state = setup();

        // Create a profile for USER1
        let user1: ContractAddress = USER1.try_into().unwrap();
        set_caller_address(user1);
        let username: ByteArray = "user1";
        let ipfs_hash: ByteArray = "QmHashForUser1";
        let created_token_id = UserProfileNFT::ExternalImpl::create_profile(
            ref state, username, ipfs_hash,
        );

        // Get token ID by address
        let token_id = UserProfileNFT::ExternalImpl::get_token_id_by_address(@state, user1);

        // Check token ID
        assert(token_id == created_token_id, 'Token ID mismatch');
    }

    // Test: Update profile
    #[test]
    fn test_update_profile() {
        // Setup
        let mut state = setup();

        // Create a profile for USER1
        let user1: ContractAddress = USER1.try_into().unwrap();
        set_caller_address(user1);
        let username: ByteArray = "user1";
        let ipfs_hash: ByteArray = "QmHashForUser1";
        let token_id = UserProfileNFT::ExternalImpl::create_profile(ref state, username, ipfs_hash);

        // Update timestamp to simulate time passing
        set_block_timestamp(2000);

        // Update profile
        let new_username: ByteArray = "updated_user1";
        let new_ipfs_hash: ByteArray = "QmNewHashForUser1";
        UserProfileNFT::ExternalImpl::update_profile(ref state, new_username, new_ipfs_hash);

        // Get updated profile
        let profile = UserProfileNFT::ExternalImpl::get_profile_by_token_id(@state, token_id);

        // Check updated data
        assert(profile.username == new_username, 'Username not updated');
        assert(profile.ipfs_hash == new_ipfs_hash, 'IPFS hash not updated');
        assert(profile.created_at == 1000, 'Created timestamp should not change');
        assert(profile.updated_at == 2000, 'Updated timestamp not updated');
    }

    // Test: User can't create multiple profiles
    #[test]
    #[should_panic(expected: ('User already has a profile',))]
    fn test_cannot_create_multiple_profiles() {
        // Setup
        let mut state = setup();

        // Create a profile for USER1
        let user1: ContractAddress = USER1.try_into().unwrap();
        set_caller_address(user1);
        let username: ByteArray = "user1";
        let ipfs_hash: ByteArray = "QmHashForUser1";
        UserProfileNFT::ExternalImpl::create_profile(ref state, username, ipfs_hash);

        // Try to create another profile for the same user
        // This should fail
        UserProfileNFT::ExternalImpl::create_profile(ref state, "another", "QmAnotherHash");
    }

    // Test: Can't get profile for non-existent user
    #[test]
    #[should_panic(expected: ('Address does not have a profile',))]
    fn test_get_profile_nonexistent_user() {
        // Setup
        let mut state = setup();

        // Try to get profile for USER1 who doesn't have one
        let user1: ContractAddress = USER1.try_into().unwrap();
        UserProfileNFT::ExternalImpl::get_profile_by_address(@state, user1);
    }
}
