export const langEn = {
    interFaceMessage: {
        common: {
            'success': 'Success',
            '1': 'Created successfully',
            // '0': 'The network is busy, please check your network connection',
            '0': 'The network is busy',
            '-11': 'The account is locked or not logged in',
            '114': 'The account is locked or not logged in',
            '101': 'Parameter is missing',
            '2': 'You are not the owner of the asset',
            'InsufficientBalance': 'Insufficient balance',
            '3': 'The account do not match',
            '4': 'Network is busy or the account do not match'
        },
        creatNHAssetOrder: {
            '1': 'Order submitted',
            '2': 'Order expired'
        },
        deleteNHAsset: {
            '1': 'Deleted successfully',
            // 10-15
            '2': 'Failed to delete',
            '3': 'You are not the owner of the asset, so you cannot delete the asset.'
        },
        fillNHAssetOrder: {
            '1': '购买成功',
            'orderhasexpired': 'Order expired',
            'InsufficientBalance': 'Insufficient balance',
            'selforder': 'You cannot fill the order created by yourself',
        },
        cancelNHAssetOrder: {
            '1': 'Canceled',
            '0': 'Order expired'
        },
        creatWorldView: {
            '0': 'The Multiverse already exists',
            '2': 'Please register a developer account first',
            '131': 'The Multiverse cannot be empty',
            '3': 'Cannot start with a number',
        },
        registerCreator: {
            '1': 'Registered successfully',
            '0': 'You have already registered',
            // 10-16
            '2': 'Registration failed'
        }
    },

    common: {
        sellOut: 'Sell',
        discard: 'Discard',
        registerCreator: 'Register a developer account',
        createViewWorld: 'Create a Multiverse',
        createAsset: 'Create A New Asset',
        goback: 'Back',
        confirm: 'Confirm',
        removebtn: 'Delete',
        addbtn: 'Add',
        immediatePurchaseBtn: 'Buy Now',
        cancellationOfOrderBtn: 'Cancel the order'
    },

    
    tipsMessage: {
        common: {
            notInputRepeat: 'Do not input repeatedly',
            firstCreateWorldView: 'Please create a Multiverse first',

            // 10-16
            notEmpty: ' cannot be empty',
            accountLocked: 'Please unlock your account first',
            linkFailure: 'Failed to connect. Please check if the plug-in wallet is open normally'
        }
    }
}