'use client';
import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { X } from 'lucide-react';
import { convertToEmbedUrl } from '@/components/urlconverter';

type ScreenType = {
	id: string;
	url: string;
	x: number;
	y: number;
	width: number;
	height: number;
};

type ScreenProps = {
	screen: ScreenType;
	onClose: () => void;
	onUpdate: (updates: Partial<ScreenType>) => void;
};


export function Screen({ screen, onClose, onUpdate }: ScreenProps) {
	const [isDragging, setIsDragging] = useState(false);
	const embedUrl = convertToEmbedUrl(screen.url); 
		
	return(
		<Rnd default = {{x: screen.x, y: screen.y, width: screen.width, height: screen.height}} 
			minWidth = {320} 
			minHeight = {200} 
			className = 'border overflow-hidden' 
			dragHandleClassName = 'drag-handle'
			onDragStart = {() => setIsDragging(true)}
      onDragStop = {(e, d) => {setIsDragging(false); onUpdate({x: d.x, y: d.y});}}
			onResizeStop = {(e, direction, ref, delta, position) => {
				onUpdate({width: parseInt(ref.style.width),
								height: parseInt(ref.style.height),
								x: position.x,
								y: position.y
								 });
			}}
			cancel = '.cancel_drag'>

			{isDragging && (
        <div className='absolute inset-0 z-20' />
      )}
			
			<div className = 'drag-handle absolute top-0 left-0 w-full h-8 cursor-move z-10'>
				<X className = 'cancel_drag opacity-0 hover:opacity-100 hover:cursor-pointer transition-all z-30'
					onClick = {(e) => {e.stopPropagation();
														onClose();
														}} />
			</div>
			<iframe src = {embedUrl} className = 'w-full h-full' title = 'screen'/>
		</Rnd>	
	)
}