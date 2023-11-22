import { useEffect, useState } from "react";
import "./App.css";
import Template from "./component/template.jsx";
import PrepublicationContract from "./config/Contract.js";
import {
	Paper,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	Grid,
	Box,
} from "@mui/material";
import DocumentCard from "./component/documentCard.jsx";

function App() {
	const [author, setAuthor] = useState("-1");
	const [authorList, setAuthorList] = useState(null);
	const [documentList, setDocumentList] = useState(null);

	const handleChange = (event) => {
		setAuthor(event.target.value);
	};

	const getAllAuthor = async () => {
		try {
			const result = await PrepublicationContract.methods
				.getAllAuthors()
				.call();
			setAuthorList(result);
		} catch (error) {
			console.error("Error getting all authors:", error);
			throw error;
		}
	};

	const getAuthorDocuments = async (authorAddress) => {
		try {
			const result = await PrepublicationContract.methods
				.getAuthorDocuments(authorAddress)
				.call();
			setDocumentList(result.docs);
		} catch (error) {
			console.error("Error getting author documents:", error);
			throw error;
		}
	};

	// Fonction pour récupérer tous les documents
	const getAllDocuments = async () => {
		try {
			const result = await PrepublicationContract.methods
				.getDocuments()
				.call();
			setDocumentList(result);
		} catch (error) {
			console.error("Error getting all documents:", error);
			throw error;
		}
	};

	useEffect(() => {
		getAllAuthor();
		if (author == "-1") {
			getAllDocuments();
		} else {
			getAuthorDocuments(author);
		}
	}, [author]);

	return (
		<>
			<Template>
				<Box>
					<Paper
						style={{
							boxShadow:
								"rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
						}}
					>
						<FormControl sx={{ minWidth: "800px" }}>
							<InputLabel id="author">
								Select an author
							</InputLabel>
							<Select
								labelId="author"
								value={author}
								label="Select an author"
								onChange={handleChange}
							>
								<MenuItem key={-1} value={"-1"}>
									All
								</MenuItem>
								{authorList &&
									authorList.map((author, index) => (
										<MenuItem key={index} value={author}>
											{author}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Paper>
					<br/>
					<Grid container spacing={2}>
						{documentList &&
							documentList.map((doc, index) => (
								<Grid key={index} item xs={4}>
									<DocumentCard
										author={doc.author}
										timestamp={doc.timestamp}
									/>
								</Grid>
							))}
					</Grid>
				</Box>
			</Template>
		</>
	);
}

export default App;
