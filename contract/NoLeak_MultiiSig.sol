pragma solidity 0.8.7;

contract NoLeak_MultiiSig {
    
    address mainOwner;
    address[] walletowners;
    uint limit;
    uint depositId = 0;
    uint withdrawalId = 0;
    uint transferId = 0;
    
    constructor() {
        mainOwner = msg.sender; // 배포한사람
        walletowners.push(mainOwner); // 배포한사람은 금고 초기 소유자
        limit = walletowners.length - 1;
    }
    
    mapping(address => uint) balance;
    mapping(address => mapping(uint => bool)) approvals; // 주소 👉 거래번호 👉 true
    
    struct Transfer {
        
        address sender; // 보내는사람
        address payable receiver; // 받는사람
        uint amount; // 금액
        uint id; // 거래번호
        uint approvalNum; // 승인된 수
        uint timeOfTransaction; // 시간
    }
    
    Transfer[] transferRequests;
    
    // evnet를 일으켜 해당 함수값 초기화
    event walletOwnerAdded(address addedBy, address ownerAdded, uint timeOfTransaction);
    event walletOwnerRemoved(address removedBy, address ownerRemoved, uint timeOfTransaction);
    event fundsDeposited(address sender, uint amount, uint depositId, uint timeOfTransaction);
    event fundsWithdrawed(address sender, uint amount, uint withdrawalId, uint timeOfTransaction);
    event transferCreated(address sender, address receiver, uint amount, uint id, uint approvalNum, uint timeOfTransaction);
    event transferCancelled(address sender, address receiver, uint amount, uint id, uint approvalNum, uint timeOfTransaction);
    event transferApproved(address sender, address receiver, uint amount, uint id, uint approvalNum, uint timeOfTransaction);
    event fundsTransfered(address sender, address receiver, uint amount, uint id, uint approvalNum, uint timeOfTransaction);
    
    //-------------------------------------
    modifier onlyowners() {
        
       bool isOwner = false;

       for (uint i = 0; i< walletowners.length; i++) {
           if (walletowners[i] == msg.sender) { 
               // walletowners 배열안에 msg.sender가 있다면 
               isOwner = true; // 금고 사용자인것을 확인
               break;
           }
       }
       require(isOwner == true, "only wallet owners can call this function");
       _; // 함수 실행
    }
    //-------------------------------------

    // 금고 사용자 추가
    function addWalletOwner(address owner) public onlyowners {
        
        // walletowners 배열
       for (uint i = 0; i < walletowners.length; i++) {
           if(walletowners[i] == owner) {
               // walletowners 배열안에 이미 추가된 주소가 있다면 
               revert("cannot add duplicate owners"); // 에러발생
           }
       }
        
        walletowners.push(owner); // 배열에 owner 주소추가
        limit = walletowners.length - 1;
        
        emit walletOwnerAdded(msg.sender, owner, block.timestamp);
        // 배포자, 금고 사용자 추가, 시간
    }
    
    // 금고 사용자 삭제
    function removeWalletOwner(address owner) public onlyowners {
        
        bool hasBeenFound = false;
        uint ownerIndex;
        for (uint i = 0; i < walletowners.length; i++) {
            if(walletowners[i] == owner) {
                // walletowners 배열안에 이미 추가된 주소가 있다면 
                hasBeenFound = true;
                ownerIndex = i; // 해당 주소 index 찾음
                break;
            }
        }
        
        require(hasBeenFound == true, "wallet owner not detected");
        
        walletowners[ownerIndex] = walletowners[walletowners.length - 1];
        // walletowners 배열에서 해당주소 index
        walletowners.pop(); // 배열에서 pop 시킴
        limit = walletowners.length - 1;
        
         emit walletOwnerRemoved(msg.sender, owner, block.timestamp);
    }
    
    // 금고에 입금
    function deposit() public payable onlyowners {
        
        require(balance[msg.sender] >= 0, "cannot deposiit a calue of 0");
        // 내 지갑에 잔고가 0보다 크면 실행
        
        balance[msg.sender] = msg.value; 
        // msg.sender에게 value값
        
        emit fundsDeposited(msg.sender, msg.value, depositId, block.timestamp);
        depositId++;
        
    } 
    
    // 금고에서 출금
    function withdraw(uint amount) public onlyowners {
        
        require(balance[msg.sender] >= amount);
        // 금고 잔고가 amount보다 크거나 같으면 실행
        
        balance[msg.sender] -= amount; // 금고 잔고는 amount만큼 감소
        
        payable(msg.sender).transfer(amount); 
        // msg.sender에게 amount만큼 전송
        
        emit fundsWithdrawed(msg.sender, amount, withdrawalId, block.timestamp);
         withdrawalId++;
    }
    
    // 금고에서 거래생성 (송금)
    function createTrnasferRequest(address payable receiver, uint amount) public onlyowners {
        
        require(balance[msg.sender] >= amount, "insufficent funds to create a transfer");
        // 금고 잔고가 amount보다 크거나 같으면 실행
        for (uint i = 0; i < walletowners.length; i++) {
            require(walletowners[i] != receiver, "cannot transfer funds withiwn the wallet");
            // walletowners 배열안에 있는 주소와 / 송금 받을 주소가 다르면 실행
        }
        
        balance[msg.sender] -= amount; // 금고 잔고는 amount만큼 감소
        transferRequests.push(Transfer(msg.sender, receiver, amount, transferId, 0, block.timestamp));
        // struct Transfer 에 push / 0 은 승인된 수를 0으로 초기화 한다는뜻
        transferId++;
        emit transferCreated(msg.sender, receiver, amount, transferId, 0, block.timestamp);
    }
    
    // 생성된 거래취소
    function cancelTransferRequest(uint id) public onlyowners { // 몇번째 거래인지 입력
        
        bool hasBeenFound = false;
        uint transferIndex = 0;
        for (uint i = 0; i < transferRequests.length; i++) {
            
            if(transferRequests[i].id == id) {
                // struct Transfer 에서 id 값 = 입력한 id 값
                hasBeenFound = true;
                break;
            }
             transferIndex++;
        }
        
        require(transferRequests[transferIndex].sender == msg.sender, "only the transfer creator can cancel");
        // struct Transfer 에서 id 값 = 함수 실행자 
        require(hasBeenFound, "transfer request does not exist"); // true 일경우
        
        balance[msg.sender] += transferRequests[transferIndex].amount;
        // 금고 잔고에서 Transfer 에서 id 값의 양 증가
        transferRequests[transferIndex] = transferRequests[transferRequests.length - 1];
        // Transfer 에서 id 값 = 배열의 마지막값

        emit transferCancelled(msg.sender, transferRequests[transferIndex].receiver, transferRequests[transferIndex].amount, transferRequests[transferIndex].id, transferRequests[transferIndex].approvalNum, transferRequests[transferIndex].timeOfTransaction);
        transferRequests.pop(); // pop
    }
    
    // 생성된 거래승인
    function approveTransferRequest(uint id) public onlyowners { // 몇번째 거래인지 입력
        
        bool hasBeenFound = false;
        uint transferIndex = 0;
        for (uint i = 0; i < transferRequests.length; i++) {
            
            if(transferRequests[i].id == id) {
                // struct Transfer 에서 id 값 = 입력한 id 값
                hasBeenFound = true;
                break;
            }
             transferIndex++;
        }
        
        require(hasBeenFound, "only the transfer creator can cancel"); // true 일경우
        require(approvals[msg.sender][id] == false, "cannot approve the same transfer twice");
        // approvals mapping 👉 함수 실행자가 입력한 id 값 == false 일경우 (승인이 안됐으니 false)
        require(transferRequests[transferIndex].sender != msg.sender);
        // 거래를 만든사람이 = 함수를 실행하지 못하도록
        approvals[msg.sender][id] = true;
        transferRequests[transferIndex].approvalNum++;
        // 해당거래의 승인수 ++
        
        emit transferApproved(msg.sender, transferRequests[transferIndex].receiver, transferRequests[transferIndex].amount, transferRequests[transferIndex].id, transferRequests[transferIndex].approvalNum, transferRequests[transferIndex].timeOfTransaction);
        
        if (transferRequests[transferIndex].approvalNum == limit) {
            // 해당거래의 승인수가 / 금고사용자수와 같을경우
            transferFunds(transferIndex);
            // transferFunds 함수 실행
        }
    }

    // 👆👆👆
    function transferFunds(uint id) private {
        
        balance[transferRequests[id].receiver] += transferRequests[id].amount;
        // 송금받는 사람 receiver 의 잔고 amount ++
        transferRequests[id].receiver.transfer(transferRequests[id].amount);
        // 송금받는 사람에게 transfer요청 

        emit fundsTransfered(msg.sender, transferRequests[id].receiver, transferRequests[id].amount, transferRequests[id].id, transferRequests[id].approvalNum, transferRequests[id].timeOfTransaction);
        
        transferRequests[id] = transferRequests[transferRequests.length - 1];
        // struct Transfer 에서 id 값 = struct Transfer 에서 마지막 거래내역 배열
        transferRequests.pop(); // 그 거래내역을 pop
    }
    
    //------------------------------------------
    // 금고 사용자 조회
    function getWalletOners() public view returns(address[] memory) {
        return walletowners;
    }

    // 승인된 결과 조회 (true / false 반환)
    function getApprovals(uint id) public view returns(bool) {
        return approvals[msg.sender][id];
    }
    
    // 생성된 거래조회 (Transfer 배열)
    function getTransferRequests() public view returns(Transfer[] memory) {
        return transferRequests;
    }
    
    // 금고 잔고조회
    function getBalance() public view returns(uint) {
        return balance[msg.sender]; 
    }
    
    // 등록된 사용자 수 조회 (컨트랙트 배포자 msg.sender 제외)
    function getApprovalLimit() public view returns (uint) {
        return limit;
    }

    // 컨트랙트 잔고조회
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }    
}