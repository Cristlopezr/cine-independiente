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
				stroke='#ccc'
				fill='transparent'
				strokeWidth={strokeWidth}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<circle
				stroke='#007BFF'
				fill='transparent'
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
				fontSize='20'
				fontWeight='bold'
				fill='#007BFF'
			>
				{progress}%
			</text>
		</svg>
	);
};
