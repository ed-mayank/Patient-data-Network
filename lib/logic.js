'use strict';

/**
 * Consent transaction for sharing a data asset with a practitioner
 * @param {org.cc.patientdatanetwork.ShareWithPractitioner} ShareWithPractitioner
 * @transaction
 */
async function ShareWithPractitioner(tx) {
    // Get the Procedure asset + and share with practitioner.
    let practitionerId = tx.practitioner.participantId;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(tx.assetType);
    let asset = await assetRegistry.get(tx.assetReference);
    await console.log('all the', tx.assetType, ' items are ', tx.assetReference);

    if (asset.practitionersWithAccess) {
        if (asset.practitionersWithAccess.indexOf(practitionerId) > -1) {
            console.log('Asset ' + asset.assetId + ' is already shared with ' + tx.practitioner.firstName);
        }
        else {
            // add practitioner ID to practitionersWithAccess array
            asset.practitionersWithAccess.push(practitionerId);
        }
    }
    else {
        console.log('You are sharing this item for the first time');
        asset.practitionersWithAccess = [practitionerId];
    }
    // Update the asset in the asset registry.
    await assetRegistry.update(asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.cc.patientdatanetwork', 'AssetSharedwithPractitioner');
    event.assetType = tx.assetType;
    event.assetReference = tx.assetReference;
    event.practitioner = tx.practitioner;
    emit(event);
}

/**
 * Consent transaction for a data asset with an Org
 * @param {org.cc.patientdatanetwork.ShareWithOrg} ShareWithOrg
 * @transaction
 */
async function ShareWithOrg(tx) {
    // Get the Medication asset + share with new practitioner.
    let organizationId = tx.organization.organizationId;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(tx.assetType);
    let asset = await assetRegistry.get(tx.assetReference);

    if (asset.orgsWithAccess) {
        if (asset.orgsWithAccess.indexOf(organizationId) > -1) {
            console.log('Asset ' + asset.assetId + ' is already shared with ' + tx.organization.name);
        }
        else {
            // add practitioner ID to orgsWithAccess array
            asset.orgsWithAccess.push(organizationId);
        }
    }
    else {
        console.log('You are sharing this item for the first time');
        asset.orgsWithAccess = [organizationId];
    }

    // Update the asset in the asset registry.
    await assetRegistry.update(asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.cc.patientdatanetwork', 'AssetSharedWithOrg');
    event.assetType = tx.assetType;
    event.assetReference = tx.assetReference;
    event.organization = tx.organization;
    emit(event);
}
