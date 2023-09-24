import { CircularProgressBar } from '.';

export const Progress = ({ progress, text }: { progress: number; text: string }) => {
	return (
		<>
			<CircularProgressBar strokeWidth={8} radius={75} progress={progress} />
			{text}
		</>
	);
};
