export const CircularProgressBar = ({
	strokeWidth,
	radius,
	progress,
}: {
	strokeWidth: number;
	radius: number;
	progress: number;
}) => {
	const normalizedRadius = radius - strokeWidth * 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<svg height={radius * 2} width={radius * 2}>
			<circle
				className='fill-transparent stroke-muted-foreground/30'
				strokeWidth={strokeWidth}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<circle
				className='fill-transparent stroke-muted-foreground/70'
				strokeWidth={strokeWidth + 0.5}
				strokeDasharray={circumference}
				style={{
					strokeDashoffset,
					transform: 'rotate(-90deg)',
					transformOrigin: '50% 50%',
				}}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<text
				x={radius}
				y={radius}
				textAnchor='middle'
				dominantBaseline='middle'
				className='fill-accent-foreground font-bold text-xl'
			>
				{progress}%
			</text>
		</svg>
	);
};
