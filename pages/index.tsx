import { Text, Title } from "components"
import classnames from "classnames"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>ReiffLabs</title>
      </Head>
      <main
        className={classnames("grid", "text-center")}
        style={{ placeItems: "center", height: "100vh" }}
      >
        <div>
          <Title>Big things are coming soon</Title>
          <Text>
            <b>ReiffLabs</b> a technology company.
          </Text>
        </div>
      </main>
    </>
  )
}
