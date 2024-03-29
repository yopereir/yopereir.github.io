/** @jsx jsx */
/* eslint no-shadow: 0 */
import { jsx, Container, Heading, Themed, Box } from "theme-ui"
import { useSpring, animated, config } from "react-spring"
import { rgba } from "polished"
import { IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "./layout"
import Header from "./header"
import Card from "./card"
import useSiteMetadata from "../hooks/use-site-metadata"

type Props = {
  projects: {
    slug: string
    title: string
    categories?: string[]
    importance?: number
    date: string
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }[],
  categoriesToShow?: string[]
}

function getProjectsInCategory(category, projects){
  let projectsInCategory = []
  projects.forEach(project => {
    if(project.categories !== null && project.categories.includes(category)) projectsInCategory.push(project);
  });
  return projectsInCategory;
}

const Projects = ({ projects }: Props) => {
  const { categoriesToShow } = useSiteMetadata()
  const fadeUpProps = useSpring({
    config: config.slow,
    delay: 600,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })

  if (projects.length === 0) {
    return (
      <Layout>
        <Header />
        <Container>
          <Themed.p>
            Hi!{` `}
            <span role="img" aria-label="Wave emoji">
              👋
            </span>
            {` `}
            <br />
            Thanks for using <b>@lekoarts/gatsby-theme-emilia</b>. You currently don't have any content in your{` `}
            <i>projects</i> folder - that's why this page displays a placeholder text. Head over to the{` `}
            <Themed.a href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-emilia">
              README
            </Themed.a>
            {` `}
            to learn how to setup them.
          </Themed.p>
          <Themed.p>
            <b>TL;DR:</b> <br />
            The starter automatically created the folder <code>content/projects</code>. Go into this folder, create a
            new folder called <code>example</code> and create an <code>index.mdx</code> file there and place an image.
            Edit the frontmatter like described in the{` `}
            <Themed.a href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-emilia">
              README
            </Themed.a>
            .
          </Themed.p>
        </Container>
      </Layout>
    )
  }

  projects = projects.sort((a,b)=>{
    const regexMatchA = a.date.match(/\w+/g) // a.date.match(/([\d]{2})-([\d]{2})-([\d]{4}|[\d]{2})/g)
    const regexMatchB = b.date.match(/\w+/g)
    console.log(a.importance,b.importance);
    if(((a.importance == null)?0:parseInt(""+a.importance)) > ((b.importance == null)?0:parseInt(""+b.importance))) return -1;
    else if(((a.importance == null)?0:parseInt(""+a.importance)) < ((b.importance == null)?0:parseInt(""+b.importance))) return 1;

    if(regexMatchA == null && regexMatchB == null) return 0;
    if(regexMatchA == null) return 1;
    if(regexMatchB == null) return -1;
    if(regexMatchB[regexMatchB.length-1] == 'Present') return 1;
    if(regexMatchA[regexMatchA.length-1] == 'Present') return -1;
    
    if(new Date(regexMatchA[regexMatchA.length-2]+", "+regexMatchA[regexMatchA.length-1]) > new Date(regexMatchB[regexMatchB.length-2]+", "+regexMatchB[regexMatchB.length-1])) return -1;
    else return 1;

  });
  let projectsToDisplay = projects.map((project, index) => {
    const val = project.cover.childImageSharp.gatsbyImageData.backgroundColor as string
    const shadow = rgba(val, 0.15)

    const px = [`64px`, `32px`, `16px`, `8px`, `4px`]
    const shadowArray = px.map((v) => `${shadow} 0px ${v} ${v} 0px`)

    return <Card key={project.slug} eager={index === 0} item={project} overlay={val} shadow={shadowArray} />
  })
  return (
    <Layout>
      <Header />
      <Box as="main" variant="layout.main">
        <animated.div style={fadeUpProps}>
          {(categoriesToShow.length === 0 || categoriesToShow.includes("All"))
          ?
          <Container
            sx={{
              mt: `-8rem`,
              display: `grid`,
              gridTemplateColumns: [`1fr`, `repeat(auto-fill, minmax(350px, 1fr))`],
              gridGap: 4,
              alignItems: `flex-start`,
            }}
          >
            {projectsToDisplay}
          </Container>
          :
          categoriesToShow.map((category)=>{
            return <div>
              {(categoriesToShow.length !== 1)?
            <Heading id={category} style={{marginLeft: "2rem", minHeight: "10rem"}} as="h2" variant="styles.h2">
              {category}
            </Heading>:""}
            <Container
              sx={{
                mt: `-8rem`,
                display: `grid`,
                gridTemplateColumns: [`1fr`, `repeat(auto-fill, minmax(350px, 1fr))`],
                gridGap: 4,
                alignItems: `flex-start`,
              }}>
              {getProjectsInCategory(category, projects).map((project, index) => {
                const val = project.cover.childImageSharp.gatsbyImageData.backgroundColor as string
                const shadow = rgba(val, 0.15)

                const px = [`64px`, `32px`, `16px`, `8px`, `4px`]
                const shadowArray = px.map((v) => `${shadow} 0px ${v} ${v} 0px`)

                return <Card key={project.slug} eager={index === 0} item={project} overlay={val} shadow={shadowArray} />
              })}
            </Container>
            </div>
          })
          }
        </animated.div>
      </Box>
    </Layout>
  )
}

export default Projects
