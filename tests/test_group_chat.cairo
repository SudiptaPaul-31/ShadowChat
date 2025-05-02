%lang starknet

@external
func test_create_group() -> ():
    """
    Test the create_group function.
    """
    # Deploy the contract
    let (contract_address) = deploy_contract("GroupChat")

    # Call create_group
    let group_id = 1
    let name = "Test Group"
    let description = "This is a test group"
    let creator = 12345

    call_contract(
        contract_address,
        "create_group",
        (group_id, name, description, creator)
    )

    # Verify group creation
    let (group_details) = call_contract(
        contract_address,
        "get_group",
        (group_id,)
    )
    assert group_details.name == name
    assert group_details.description == description
    assert group_details.creator == creator

    return ()
end
