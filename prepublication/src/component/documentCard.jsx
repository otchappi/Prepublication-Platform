import * as React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import DocImage from "../assets/doc.png";
import { splitStringIntoLines, formatTimestamp } from "../utils/formatUtils.js";

function MultilineString(text, size) {
	const lines = splitStringIntoLines(text, size); // Divise le texte tous les 20 caractères
	return (
        <>
            {lines.map((line, index) => (
                <span key={index}>
                    <span key={index}>{line}</span>
                    <br />
                </span>
            ))}
        </>
	);
}

export default function DocumentCard({ timestamp, author }) {
	return (
		<Card>
			<CardMedia sx={{ m: 'auto' }} style={{height:100, width: 100, marginTop:'15px'}} image={DocImage} title="Doc" />
			<CardContent>
				<Typography gutterBottom variant="subtitle2" component="div">
					<strong>Uploaded at : <br/>
                    {formatTimestamp(timestamp)}</strong>
				</Typography>
				<Typography variant="body2" color="text.secondary">
                    Author : <br/>
					{MultilineString(author, 21)}
				</Typography>
			</CardContent>
		</Card>
	);
}
