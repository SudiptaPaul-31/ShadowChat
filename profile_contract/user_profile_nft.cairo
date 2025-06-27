// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts for Cairo ^2.0.0

// UserProfileNFT: An ERC-1155 contract for managing user profiles on ShadowChat
// Each profile contains metadata with username, wallet address and IPFS hash for profile picture

#[starknet::contract]
mod UserProfileNFT {
    // Import required components from OpenZeppelin
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc1155::{ERC1155Component, ERC1155HooksEmptyImpl};
    use openzeppelin::upgrades::interface::IUpgradeable;
    use openzeppelin::upgrades::UpgradeableComponent;
    use starknet::{ClassHash, ContractAddress, get_caller_address};
    use array::ArrayTrait;
    use box::BoxTrait;
    use zeroable::Zeroable;
    use option::OptionTrait;

    // Define component structure for each OpenZeppelin component we'll use
    component!(path: ERC1155Component, storage: erc1155, event: ERC1155Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    // External implementations - these are accessible from outside the contract
    #[abi(embed_v0)]
    impl ERC1155MixinImpl = ERC1155Component::ERC1155MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;

    // Internal implementations - these are used within the contract
    impl ERC1155InternalImpl = ERC1155Component::InternalImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    // User profile struct to hold metadata
    #[derive(Drop, starknet::Store, Serde)]
    struct UserProfile {
        username: ByteArray,
        wallet_address: ContractAddress,
        ipfs_hash: ByteArray,
        created_at: u64,
        updated_at: u64,
    }

    // Contract storage variables
    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc1155: ERC1155Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
        
        // Custom storage variables for user profiles
        profiles: LegacyMap<u256, UserProfile>, // Map token ID to profile
        address_to_token_id: LegacyMap<ContractAddress, u256>, // Map address to token ID
        token_id_counter: u256, // Counter for token IDs
        has_profile: LegacyMap<ContractAddress, bool>, // Whether an address has a profile
    }

    // Events definition
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC1155Event: ERC1155Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
        
        // Custom events for profile management
        ProfileCreated: ProfileCreated,
        ProfileUpdated: ProfileUpdated,
    }

    // Custom event for profile creation
    #[derive(Drop, starknet::Event)]
    struct ProfileCreated {
        token_id: u256,
        owner: ContractAddress,
        username: ByteArray,
        ipfs_hash: ByteArray,
    }

    // Custom event for profile updates
    #[derive(Drop, starknet::Event)]
    struct ProfileUpdated {
        token_id: u256,
        owner: ContractAddress,
        username: ByteArray,
        ipfs_hash: ByteArray,
    }

    // Constructor for contract initialization
    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, base_uri: ByteArray) {
        // Initialize ERC1155 with base URI
        self.erc1155.initializer(base_uri);
        
        // Initialize Ownable component with the specified owner
        self.ownable.initializer(owner);
        
        // Initialize token ID counter
        self.token_id_counter.write(1);
    }

    // Generate trait for external functions
    #[generate_trait]
    #[abi(per_item)]
    impl ExternalImpl of ExternalTrait {
        // Update base URI - only owner can call this
        #[external(v0)]
        fn set_base_uri(ref self: ContractState, base_uri: ByteArray) {
            // Only owner can update the base URI
            self.ownable.assert_only_owner();
            self.erc1155._set_base_uri(base_uri);
        }

        // Alternative name for setting base URI to maintain compatibility
        #[external(v0)]
        fn setBaseUri(ref self: ContractState, baseUri: ByteArray) {
            self.set_base_uri(baseUri);
        }
        
        // Create a new user profile and mint an ERC1155 token for it
        #[external(v0)]
        fn create_profile(
            ref self: ContractState, 
            username: ByteArray, 
            ipfs_hash: ByteArray
        ) -> u256 {
            // Get caller address (the user creating the profile)
            let caller = get_caller_address();
            
            // Check if user already has a profile
            assert(!self.has_profile.read(caller), 'User already has a profile');
            
            // Get current token ID and increment counter
            let token_id = self.token_id_counter.read();
            self.token_id_counter.write(token_id + 1);
            
            // Get current timestamp
            let timestamp = starknet::get_block_timestamp();
            
            // Create the profile
            let profile = UserProfile {
                username: username,
                wallet_address: caller,
                ipfs_hash: ipfs_hash,
                created_at: timestamp,
                updated_at: timestamp,
            };
            
            // Store profile data
            self.profiles.write(token_id, profile);
            self.address_to_token_id.write(caller, token_id);
            self.has_profile.write(caller, true);
            
            // Mint a single token to the caller
            self.erc1155._mint(caller, token_id, 1, ArrayTrait::<felt252>::new());
            
            // Emit event
            self.emit(Event::ProfileCreated(ProfileCreated {
                token_id: token_id,
                owner: caller,
                username: username,
                ipfs_hash: ipfs_hash,
            }));
            
            // Return the token ID
            token_id
        }
        
        // Update an existing profile
        #[external(v0)]
        fn update_profile(
            ref self: ContractState, 
            username: ByteArray, 
            ipfs_hash: ByteArray
        ) {
            // Get caller address (the profile owner)
            let caller = get_caller_address();
            
            // Check if user has a profile
            assert(self.has_profile.read(caller), 'User does not have a profile');
            
            // Get the token ID associated with this address
            let token_id = self.address_to_token_id.read(caller);
            
            // Ensure the caller owns this token
            assert(
                self.erc1155.balance_of(caller, token_id) == 1, 
                'Caller does not own this profile'
            );
            
            // Get the current profile
            let mut profile = self.profiles.read(token_id);
            
            // Update the profile
            profile.username = username;
            profile.ipfs_hash = ipfs_hash;
            profile.updated_at = starknet::get_block_timestamp();
            
            // Save the updated profile
            self.profiles.write(token_id, profile);
            
            // Emit event
            self.emit(Event::ProfileUpdated(ProfileUpdated {
                token_id: token_id,
                owner: caller,
                username: username,
                ipfs_hash: ipfs_hash,
            }));
        }
        
        // Get profile information by token ID
        #[external(v0)]
        fn get_profile_by_token_id(self: @ContractState, token_id: u256) -> UserProfile {
            // Return the profile associated with this token ID
            self.profiles.read(token_id)
        }
        
        // Get profile information by wallet address
        #[external(v0)]
        fn get_profile_by_address(self: @ContractState, wallet_address: ContractAddress) -> UserProfile {
            // Check if address has a profile
            assert(self.has_profile.read(wallet_address), 'Address does not have a profile');
            
            // Get the token ID associated with this address
            let token_id = self.address_to_token_id.read(wallet_address);
            
            // Return the profile
            self.profiles.read(token_id)
        }
        
        // Check if an address has a profile
        #[external(v0)]
        fn has_profile(self: @ContractState, wallet_address: ContractAddress) -> bool {
            self.has_profile.read(wallet_address)
        }
        
        // Get token ID by wallet address
        #[external(v0)]
        fn get_token_id_by_address(self: @ContractState, wallet_address: ContractAddress) -> u256 {
            // Check if address has a profile
            assert(self.has_profile.read(wallet_address), 'Address does not have a profile');
            
            // Return the token ID
            self.address_to_token_id.read(wallet_address)
        }
    }

    // Upgradeable implementation
    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        // Upgrade the contract to a new implementation
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            // Only owner can upgrade the contract
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }
    }
}
