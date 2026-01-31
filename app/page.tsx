'use client'
import { useState, useEffect } from 'react';
import { Screen } from '@/components/screen';

export default function Home(){
	const [screens, setScreens] = useState<string[]>([]);
	const [inputUrl, setInputUrl] = useState('');
	
	useEffect(() => {
		const saved = localStorage.getItem('screens');
		if(saved){
			setScreens(JSON.parse(saved));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('screens', JSON.stringify(screens));
	}, [screens]);
	
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

	const removeScreen = (index: number) => {
		setScreens(screens.filter((_, i) => i !== index));
	};

	const clearAll = () => {
		setScreens([]);
	}
	
	return(
		<main className = 'relative w-screen h-screen'>
			<header className = 'fixed top-4 z-50 items-center space-x-6'>
				<input type = 'text' 
					value = {inputUrl} 
					onChange = {(e) => setInputUrl(e.target.value)} 
					onKeyPress = {handleKeyPress} 
					placeholder = "Enter URL..." />
				
				<button onClick = {addScreen}>
					add
				</button>

				<button onClick = {clearAll}>
					clear all
				</button>
			</header>
			
			<section>
				{screens.map((url, index) => (
					<Screen key = {index} url = {url} onClose = {() => removeScreen(index)} />
				))}
			</section>
		</main>
	);
}