import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import ACCOUNTS from "../data/accounts.js";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	Grid,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { chunkString } from "../utils/formatUtils.js";
import { sha256ToBytes32 } from "../utils/cryptoUtils.js";
import PrepublicationContract from "../config/Contract.js";
import AlertSideBar from "./alertSideBar.jsx";

export default function SideBar() {
	const [author, setAuthor] = useState(ACCOUNTS[0]);
	const [file, setFile] = useState(null);
	const [fileHash, setFileHash] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [saveButton, setSaveButton] = useState(true);
    const [fileTest, setFileTest] = useState(null);
	const [fileHashTest, setFileHashTest] = useState(null);
	const [checkButton, setCheckButton] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [resultCheck, setResultCheck] = useState(null);

	const handleSelectAuthorChange = (event) => {
		setAuthor(event.target.value);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
	};

    const handleTestFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFileTest(selectedFile);
	};

	const handleClose = () => {
		setIsDialogOpen(false);
        location.reload();
	};

	const readFileContent = (f) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = function (event) {
				resolve(event.target.result);
			};

			reader.onerror = function (error) {
				reject(error);
			};

			reader.readAsBinaryString(f);
		});
	};

	// Fonction pour uploader un document
	const addDocument = async() => {
		try {
            const gas = await PrepublicationContract.methods.uploadDocument(fileHash).estimateGas() + 100000n;
			const result = await PrepublicationContract.methods
				.uploadDocument(fileHash)
				.send({ from: author, gas });
			console.log("Document uploaded:", result);
            setIsDialogOpen(true);
		} catch (error) {
			console.error("Error uploading document:", error);
			throw error;
		}
	};

	// Fonction pour vérifier un document
	const checkDocument = async () => {
		try {
			const result = await PrepublicationContract.methods
				.verifyDocument(fileHashTest)
				.call();
            setIsChecked(true);
			setResultCheck(result);
		} catch (error) {
			console.error("Error verifying document:", error);
			throw error;
		}
	}

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	});

	useEffect(() => {
		const hashFile = async () => {
			if (file) {
				setFileHash(await sha256ToBytes32(await readFileContent(file)));
                setSaveButton(false);
			} else {
                setSaveButton(true);
            }

            if (fileTest) {
				setFileHashTest(
					await sha256ToBytes32(await readFileContent(fileTest)),
				);
				setCheckButton(false);
			} else {
				setCheckButton(true);
			}
		};
		hashFile();
	}, [file, fileTest]);

	return (
		<div>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<NoteAddIcon></NoteAddIcon>
					<Typography sx={{ ml: 1 }}>Add new Document</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2} justifyContent={"center"}>
						<Grid item xs={11}>
							<FormControl sx={{ width: "100%" }}>
								<InputLabel id="author">
									Select an address
								</InputLabel>
								<Select
									labelId="author"
									value={author}
									label="Select an address"
									onChange={handleSelectAuthorChange}
								>
									{ACCOUNTS &&
										ACCOUNTS.map((auth, index) => (
											<MenuItem key={index} value={auth}>
												{auth}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={11}>
							<Button
								component="label"
								variant="outlined"
								startIcon={<CloudUploadIcon />}
								sx={{ width: "100%" }}
							>
								{file && chunkString(file.name, 10)}
								{!file && "Upload File"}
								<VisuallyHiddenInput
									type="file"
									onChange={handleFileChange}
								/>
							</Button>
						</Grid>
						<Grid item xs={7}></Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								onClick={addDocument}
								disabled={saveButton}
							>
								Save
							</Button>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Dialog
				open={isDialogOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Success</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Document saved successfully !
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<SearchIcon></SearchIcon>
					<Typography>Verify a document</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2} justifyContent={"center"}>
						<Grid item xs={11}>
							<Button
								component="label"
								variant="outlined"
								startIcon={<CloudUploadIcon />}
								sx={{ width: "100%" }}
							>
								{fileTest && chunkString(fileTest.name, 10)}
								{!fileTest && "Upload File"}
								<VisuallyHiddenInput
									type="file"
									onChange={handleTestFileChange}
								/>
							</Button>
						</Grid>
						<Grid item xs={7}></Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								onClick={checkDocument}
								disabled={checkButton}
							>
								Check
							</Button>
						</Grid>
						{isChecked && <div><br/><AlertSideBar document={resultCheck} /></div>}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
