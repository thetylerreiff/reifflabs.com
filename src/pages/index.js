import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

function BlogIndex({ data , location }) {
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)

  // effect hook to set get all tags for the filter bar
  useEffect(() => {
    const posts = data.allMarkdownRemark.edges
    const allTags = posts.map(({ node }) => node.frontmatter.tags).flat();
    setTags(allTags)
  },[data.allMarkdownRemark.edges])

  function handleTagFilter(tag) {
    if (activeTag && activeTag === tag) {
      setActiveTag(null)
    } else {
      setActiveTag(tag)
    }
  }

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0 5rem',
      }}>
        {tags.map(i => (
          <span key={i}>
            <button
              type="button"
              onClick={() => handleTagFilter(i)}
              style={{ 
                background: 'none',
                boxShadow: i===activeTag ? '0 2px 3px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.24)': null,
                fontWeight: i===activeTag ? 700 : null,
                fontSize: i===activeTag ? '1.25rem' : null,
                transition: 'font-size 0.33s'
              }}
            >
              {i}
            </button>
          </span>
        ))}
      </div>
      {posts
      .filter(({ node }) => activeTag ? node.frontmatter.tags.includes(activeTag) : true)
      .map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <p
                style={{
                  display: `flex`,
                  justifyContent: 'space-between',
                }}
              >
                <small>{node.frontmatter.date}</small>
                <small>{node.frontmatter.tags}</small>
              </p>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
