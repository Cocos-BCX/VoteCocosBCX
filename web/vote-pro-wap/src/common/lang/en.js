export const langEn = {
    common: {
        vote: 'Vote',
        withdrawalVotes: 'Withdrawal',
        // withdrawalVotes: 'Withdrawal of votes',
        candidateNode: 'Candidate node',
        numberVotes: 'Number of votes',
        withdrawalVotesNum: 'Number of votes withdrawn',
        balance: 'Balance',
        numberVotesCast: 'Number of votes cast',
        cancel: 'Cancel',
        votedNode: 'Voted node',

        
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
        cancellationOfOrderBtn: 'Cancel the order',


        total: 'Total',
        choice: 'Choice',

        ShowMore: 'Show more',

        votesAvailableNum: 'Number of votes available',
        Received: 'Received',
    },
    installTips: {
        installed: 'Please confirm that you have installed'
    },
    nodeContainer: {
        voteForNode: 'Vote for node',
        selectedNode: 'Selected node',
        electedCouncil: 'Elected Council'
    },
    tabTableContainer: {
        superNode: 'Super node',
        council: 'Council',
        ranking: 'Ranking',
        country: 'Country/Region',
        voteRate: 'Vote rate',
        numberVotingAccounts: 'Number of voting accounts',
        awardsClaimed: 'Awards to be claimed (COCOS)'
    },
    interFaceMessage: {
        common: {
            'success': 'Success',
            '1': 'Created successfully',
            // '0': 'The network is busy, please check your network connection',
            '0': 'The system is busy. Please try again later',
            '-11': 'The account is locked or not logged in',
            '114': 'The account is locked or not logged in',
            '101': 'Parameter is missing',
            '2': 'You are not the owner of the asset',
            'InsufficientBalance': 'Insufficient balance',
            '3': 'The account do not match',
            '4': 'Network is busy or the account do not match',
            '5': 'Network is busy',
            '6': 'Password error',
            '7': 'There is no COCOS available'
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

    
    tipsMessage: {
        common: {
            notInputRepeat: 'Do not input repeatedly',
            firstCreateWorldView: 'Please create a Multiverse first',
            notEmpty: ' cannot be empty',
            accountLocked: 'Please unlock your account first',
            linkFailure: 'Failed to connect. Please check if the plug-in wallet is open normally',

            pleaseEnter: 'Please input'
        },
        business: {
            pleaseEnterNode: 'Please enter node name',
            noData: 'No data',

            votesExceededAvailableBalance: 'Votes exceeded available balance',
            votesWithdrawnExceedsNumber: 'The number of votes withdrawn exceeds the number of votes cast',
            votedSuccessfully: 'Voted successfully',
            votedFailed: 'Voted failed',
            maximumNumberVotesReached: 'The maximum number of votes has been reached',
            votesCannotZero: 'Votes cannot be zero',
            pleaseSelectNode: 'Please select a node',
            importAccountPrivateKey: 'Please import account private key (owner)',
            importAssetPrivateKey: 'Please import the asset private key (active)',
            lockedGreaterThanValue: 'Resources are not enough to support this operation, please mortgage gas or reserve COCOS',

            moreVotesThanAvailable: 'Can\'t exceed the number of available votes',
            cannotExceedNumberVotes: 'Can\'t exceed the number of votes cast',
            successfulWithdrawalTickets: 'Withdrew the vote successfully',
            successfulReception: 'Successful reception',
            failToReceive: 'Fail to receive'
        }
    }
}