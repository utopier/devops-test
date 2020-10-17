import Link from 'next/link';

/* eslint "jsx-a11y/anchor-is-valid":"off" */
const Home = () => {
	return (
		<>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/about">
						<a>About</a>
					</Link>
				</li>
				<li>
					<Link href="/todoapp">
						<a>TodoApp</a>
					</Link>
				</li>
			</ul>
		</>
	);
};

export default Home;
