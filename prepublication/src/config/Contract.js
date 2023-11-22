import Web3 from "web3";
import ContractABI from '../ContractABI.js';

// Initialisez Web3 avec votre fournisseur Ethereum (comme Metamask)
const web3 = new Web3("http://localhost:7545");

// Adresse du contrat
const contractAddress = "0xDe5A542BBa5AbB3C89d6302ED5533c9b463DAA27";

// Instance du contrat
const PrepublicationContract = new web3.eth.Contract(ContractABI, contractAddress);

export default PrepublicationContract;
