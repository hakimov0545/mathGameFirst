import clsx from "clsx";
import React from "react";

export const Button = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={clsx(
				"p-2 rounded-full border-none bg-blue-500 text-white hover:shadow-md transition-all",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
