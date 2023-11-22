pragma solidity >= 0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Prepublication.sol";

contract TestPrepublication {
    Prepublication prepublication = Prepublication(DeployedAddresses.Prepublication());

    bytes32 expectedHash = bytes32("0x123456789");
    address expectedAuthor = address(this);

    function testUploadDocument() public {
        uint result = prepublication.uploadDocument(expectedHash);
        Assert.equal(result, 200, "Document upload should be successful");
    }

    function testVerifyDocument() public {
        Prepublication.Document memory document = prepublication.verifyDocument(expectedHash);
        Assert.equal(document.author, expectedAuthor, "Author of the verified document should be this contract");
        Assert.equal(document.hashValue, expectedHash, "Hash value of the verified document should match the expected hash");
    }

    function testGetAuthorDocuments() public {
        Prepublication.Author memory author = prepublication.getAuthorDocuments(expectedAuthor);
        Assert.equal(author.numBooks, uint(1), "Number of books for the author should be 1");
        Assert.equal(author.docs[0].hashValue, expectedHash, "Hash value of the author's document should match the expected hash");
    }

    function testGetDocuments() public {
        Prepublication.Document[] memory documents = prepublication.getDocuments();
        Assert.equal(documents.length, uint(1), "Number of documents should be 1");
        Assert.equal(documents[0].hashValue, expectedHash, "Hash value of the document should match the expected hash");
    }

    function testGetAllAuthors() public {
        address[] memory authors = prepublication.getAllAuthors();
        Assert.equal(authors.length, uint(1), "Number of authors should be 1");
        Assert.equal(authors[0], expectedAuthor, "Author address should match the expected author address");
    }
}
