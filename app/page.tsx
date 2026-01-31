'use client'
import { useState, useEffect } from 'react';
import { Screen } from '@/components/screen';

type ScreenType = {
	id: string;
	url: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export default function Home(){
	const [screens, setScreens] = useState<ScreenType[]>([]);
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
			const newScreen: ScreenType ={
				id: Date.now().toString(),
				url: inputUrl,
				x: Math.random() * (window.innerWidth - 400),
				y: Math.random() * (window.innerHeight - 300),
				width: 400,
				height: 300
			}; 
			
			setScreens([...screens, newScreen]);
			setInputUrl('');
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if(e.key == 'Enter'){
			addScreen();
		}
	};

	const removeScreen = (id: string) => {
	setScreens(screens.filter(screen => screen.id !== id));
	};

	const updateScreen = (id: string, updates: Partial<ScreenType>) => {
		setScreens(screens.map(screen => 
			screen.id === id ? { ...screen, ...updates } : screen
		));
	};
	
	const clearAll = () => {
		setScreens([]);
	}
	
	return(
		<main className = 'relative w-screen h-screen'>
			<header className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2'>
				<input type = 'text' 
					value = {inputUrl} 
					onChange = {(e) => setInputUrl(e.target.value)} 
					onKeyPress = {handleKeyPress} 
					placeholder = "Enter URL..." 
					className = 'px-4 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] w-96'/>
				
				<button onClick = {addScreen} className = 'px-4 py-2 bg-gray opacity-50 hover:opacity-100 hover:cursor-pointer'>
					Add
				</button>

				<button onClick = {clearAll} className = 'whitespace-nowrap px-4 py-2 bg-gray opacity-50 hover:opacity-100 hover:cursor-pointer'>
					Clear All
				</button>
			</header>
			
			<section>
				{screens.map((screen) => (
					<Screen key = {screen.id} screen = {screen} onClose = {() => removeScreen(screen.id)} onUpdate={(updates) => updateScreen(screen.id, updates)} />
				))}
			</section>
		</main>
	);
}