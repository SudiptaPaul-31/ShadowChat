%lang starknet

@contract_interface
namespace GroupChat {
    @storage_var
    struct groups:
        name: felt
        description: felt
        creator: felt

    @external
    func create_group{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(group_id: felt, name: felt, description: felt, creator: felt) -> ():
        """
        Creates a new group with the given details.
        """
        # Validate inputs
        assert name != 0, "Group name cannot be empty"
        assert description != 0, "Group description cannot be empty"

        # Ensure group_id is unique
        let (exists) = groups[group_id].read()
        assert exists == 0, "Group ID already exists"

        # Store group details
        groups[group_id].write((name, description, creator))

        return ()
    end
}