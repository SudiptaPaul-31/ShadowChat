# User Profile NFT Contract

## Overview

The `UserProfileNFT` contract implements the ERC-1155 standard with the following key features:

- **Ownable**: Contract has an owner with special privileges
- **Upgradeable**: Contract can be upgraded to new implementations
- **UpdateableURI**: Base URI can be modified for metadata
- **User Profiles**: Each profile contains username, wallet address, and IPFS hash for profile pictures

## Contract Features

1. **Profile Creation**
   - Users can create one profile per wallet address
   - Each profile is represented by a unique ERC-1155 token
   - Profile metadata includes username, wallet address, and IPFS hash for profile picture

2. **Profile Updates**
   - Profile owners can update their username and profile picture
   - Update history is tracked via timestamps

3. **Profile Queries**
   - Profiles can be queried by token ID or wallet address
   - Check if an address has a profile

## Usage

### Creating a Profile

```cairo
create_profile(username: ByteArray, ipfs_hash: ByteArray) -> u256
```

This function creates a new profile for the caller and mints an ERC-1155 token to their address. Returns the token ID of the created profile.

### Updating a Profile

```cairo
update_profile(username: ByteArray, ipfs_hash: ByteArray)
```

Updates an existing profile with new username and IPFS hash. Only the profile owner can perform this action.

### Getting Profile Data

```cairo
get_profile_by_token_id(token_id: u256) -> UserProfile
get_profile_by_address(wallet_address: ContractAddress) -> UserProfile
```

These functions allow querying profile data by token ID or wallet address.

### Managing the Contract

```cairo
set_base_uri(base_uri: ByteArray)
upgrade(new_class_hash: ClassHash)
```

These functions are restricted to the contract owner and allow updating the base URI or upgrading the contract implementation.

## Implementation Details

The contract uses OpenZeppelin components:

- `ERC1155Component`: For NFT functionality
- `OwnableComponent`: For access control
- `UpgradeableComponent`: For contract upgrades
- `SRC5Component`: For interface detection

UserProfile struct contains:

- `username`: User's chosen name
- `wallet_address`: User's Starknet address
- `ipfs_hash`: Hash pointing to the user's profile picture on IPFS
- `created_at`: Timestamp when the profile was created
- `updated_at`: Timestamp when the profile was last updated
