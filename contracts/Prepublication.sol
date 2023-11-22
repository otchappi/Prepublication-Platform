// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Prepublication {
    struct Document {
        uint256 timestamp;
        bytes32 hashValue;
        address author;
    }

    struct Author {
        uint numBooks;
        Document[] docs;
    }

    mapping(address => Author) private authorDocs;
    mapping(bytes32 => Document) private hashOfDocument;

    Document[] public documents;
    address[] private authorKeys;

    function uploadDocument(bytes32 _hash) public returns(uint) {
        if(testIfExist(_hash)) {
            return 401;
        }
        Document memory newDocument = Document({
            author: msg.sender,
            hashValue: _hash,
            timestamp: block.timestamp
        });

        Author storage author = authorDocs[msg.sender];

        if (author.numBooks == 0) {
            authorKeys.push(msg.sender);
        }

        author.docs.push(newDocument);
        author.numBooks = author.docs.length;

        hashOfDocument[_hash]=newDocument;

        documents.push(newDocument);
        return 200;
    }

    function verifyDocument(bytes32 _hash) public view returns (Document memory) {
        Document memory doc = hashOfDocument[_hash];
        return doc;
    }

    function getAuthorDocuments(address _author) public view returns (Author memory) {
        Author memory auth = authorDocs[_author];
        return auth;
    }

    function getDocuments() public view returns (Document[] memory) {
        return documents;
    }

    function getAllAuthors() public view returns (address[] memory) {
        return authorKeys;
    }

    function testIfExist(bytes32 _hash) private view returns (bool) {
        for(uint i = 0; i<documents.length; i++) {
            if (documents[i].hashValue == _hash) {
                return true;
            }
        }
        return false;
    }

}