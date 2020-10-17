/* eslint "jsx-a11y/anchor-is-valid":"off" */
import Link from 'next/link';
import styled from '@emotion/styled';
import { memo } from 'react';

const NavigationWrapper = styled.nav`
	ul {
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		li {
			font-size: 1rem;
			margin-left: 10px;
		}
	}
`;

const Navigation = () => {
	return (
		<NavigationWrapper>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/todoapp">
						<a>TodoApp</a>
					</Link>
				</li>
				<li>
					<Link href="/about">
						<a>About</a>
					</Link>
				</li>
				<li>
					<Link href="/login">
						<a>Login</a>
					</Link>
				</li>
			</ul>
		</NavigationWrapper>
	);
};

export default memo(Navigation);
