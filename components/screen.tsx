'use client';
import { Rnd } from 'react-rnd';
import { useState } from 'react';

export function Screen({ url }: {url: string}) {
	const [isDragging, setIsDragging] = useState(false);
	
	return(
		<Rnd default = {{x: 0, y: 0, width: 320, height: 200}} 
			minWidth = {320} 
			minHeight = {200} 
			className = 'border-1 border-b overflow-hidden' 
			dragHandleClassName = 'drag-handle'
			onDragStart = {() => setIsDragging(true)}
      onDragStop = {() => setIsDragging(false)}>

			{isDragging && (
        <div className='absolute inset-0 z-20' />
      )}
			
			<div className = 'drag-handle absolute top-0 left-0 w-full h-8 cursor-move z-10' />
			<iframe src = {url} className = 'w-full h-full' title = 'screen'/>
		</Rnd>	
	)
}