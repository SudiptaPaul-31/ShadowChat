use starknet::ContractAddress;
use core::array::Array;

#[derive(Drop, Serde, starknet::Store)]
pub struct MediaItem {
    hash: ByteArray,
    media_type: ByteArray,
    timestamp: u64,
}

#[starknet::interface]
pub trait IMediaSharing<TContractState> {
    fn share_media(ref self: TContractState, recipient: ContractAddress, media_hash: ByteArray, media_type: ByteArray);
    fn get_media(self: @TContractState, recipient: ContractAddress, index: u64) -> MediaItem;
    fn get_all_media(self: @TContractState, recipient: ContractAddress) -> Array<MediaItem>;
}

#[starknet::contract]
pub mod MediaSharing {
    use starknet::ContractAddress;
    use starknet::get_block_timestamp;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess
    };
    use core::array::{Array, ArrayTrait};
    use super::{IMediaSharing, MediaItem};

    #[storage]
    struct Storage {
        media_count: Map::<(ContractAddress, u64), MediaItem>,
        media_counter: Map::<ContractAddress, u64>,
    }

    #[abi(embed_v0)]
    impl MediaSharingImpl of IMediaSharing<ContractState> {
        fn share_media(ref self: ContractState, recipient: ContractAddress, media_hash: ByteArray, media_type: ByteArray) {
            assert(media_hash.len() != 0, 'Media hash cannot be empty');
            assert(media_type.len() != 0, 'Media type cannot be empty');
            
            let media_item = MediaItem {
                hash: media_hash,
                media_type: media_type,
                timestamp: get_block_timestamp(),
            };
            
            let current_index = self.media_counter.read(recipient);
            
            self.media_count.write((recipient, current_index), media_item);
            
            self.media_counter.write(recipient, current_index + 1);
        }

        fn get_media(self: @ContractState, recipient: ContractAddress, index: u64) -> MediaItem {
            let total_media = self.media_counter.read(recipient);
            assert(index < total_media, 'Index out of bounds');
            
            self.media_count.read((recipient, index))
        }

        fn get_all_media(self: @ContractState, recipient: ContractAddress) -> Array<MediaItem> {
            let total_media = self.media_counter.read(recipient);
            
            let mut media_items: Array<MediaItem> = ArrayTrait::new();
            
            let mut i: u64 = 0;
            while i < total_media {
                media_items.append(self.media_count.read((recipient, i)));
                i += 1;
            };
            
            media_items
        }
    }
}