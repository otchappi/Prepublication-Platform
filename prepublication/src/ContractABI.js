const ContractABI = [
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "documents",
		outputs: [
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
			{
				internalType: "bytes32",
				name: "hashValue",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "author",
				type: "address",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "_hash",
				type: "bytes32",
			},
		],
		name: "uploadDocument",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "_hash",
				type: "bytes32",
			},
		],
		name: "verifyDocument",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "timestamp",
						type: "uint256",
					},
					{
						internalType: "bytes32",
						name: "hashValue",
						type: "bytes32",
					},
					{
						internalType: "address",
						name: "author",
						type: "address",
					},
				],
				internalType: "struct Prepublication.Document",
				name: "",
				type: "tuple",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "_author",
				type: "address",
			},
		],
		name: "getAuthorDocuments",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "numBooks",
						type: "uint256",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "timestamp",
								type: "uint256",
							},
							{
								internalType: "bytes32",
								name: "hashValue",
								type: "bytes32",
							},
							{
								internalType: "address",
								name: "author",
								type: "address",
							},
						],
						internalType: "struct Prepublication.Document[]",
						name: "docs",
						type: "tuple[]",
					},
				],
				internalType: "struct Prepublication.Author",
				name: "",
				type: "tuple",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "getDocuments",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "timestamp",
						type: "uint256",
					},
					{
						internalType: "bytes32",
						name: "hashValue",
						type: "bytes32",
					},
					{
						internalType: "address",
						name: "author",
						type: "address",
					},
				],
				internalType: "struct Prepublication.Document[]",
				name: "",
				type: "tuple[]",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "getAllAuthors",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
];

export default ContractABI;
