import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

// import { useRouter } from "next/router";

import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ event }) {
    // const router = useRouter();

    const handleDelete = (e) => {
        e.preventDefault();
        console.log("handleDelete");
    };

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${event.id}`}>
                        <a>
                            <FaPencilAlt /> Edit
                        </a>
                    </Link>
                    <a className={styles.delete} onClick={handleDelete}>
                        <FaTimes /> Delete
                    </a>
                </div>

                <span>
                    {new Date(event.date).toLocaleDateString("en-US")} at{" "}
                    {event.time}
                </span>
                <h1>{event.name}</h1>

                {event.image && (
                    <div className={styles.image}>
                        <Image
                            alt={event.slug}
                            src={event.image}
                            width={960}
                            height={600}
                        />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{event.performers}</p>
                <h3>Description:</h3>
                <p>{event.description}</p>
                <h3>Venue: {event.venue}</h3>
                <p>{event.address}</p>

                <Link href="/events">
                    <a className={styles.back}>{"<"} Go Back</a>
                </Link>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();
    const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const event = await res.json();
    return {
        props: {
            event: event[0],
        },
        revalidate: 1,
    };
}

// export async function getServerSideProps ({ query: { slug } }) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const event = await res.json();
//     return {
//         props: {
//             event: event[0],
//         },
//         revalidate: 1,
//     };
// }
