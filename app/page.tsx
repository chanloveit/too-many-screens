'use client'
import { useState } from 'react';
import { Screen } from '@/components/screen';

export default function Home(){
	const [screens, setScreens] = useState<string[]>([]);
	const [inputUrl, setInputUrl] = useState('');

	const addScreen = () => {
		if(inputUrl.trim()){
			setScreens([...screens, inputUrl]);
			setInputUrl('');
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if(e.key == 'Enter'){
			addScreen();
		}
	};
	
	return(
		<main>
			<header className = 'fixed top-4 z-50 items-center'>
				<input type = 'text' value = {inputUrl} onChange = {(e) => setInputUrl(e.target.value)} onKeyPress = {handleKeyPress} placeholder = "Enter URL..." />
				<button onClick = {addScreen}>
					add
				</button>
			</header>
			
			<section>
				{screens.map((url, index) => (
					<Screen key = {index} url = {url} />
				))}
			</section>
		</main>
	);
}