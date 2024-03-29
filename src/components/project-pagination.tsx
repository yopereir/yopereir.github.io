/** @jsx jsx */
import { jsx } from "theme-ui"
import { rgba } from "polished"
import { IGatsbyImageData } from "gatsby-plugin-image"
import Card from "./card"

type ProjectPaginationProps = {
  prev: {
    slug: string
    parent: {
      fileAbsolutePath: string
    }
    title: string
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  next: {
    slug: string
    parent: {
      fileAbsolutePath: string
    }
    title: string
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

const ProjectPagination = ({ prev, next }: ProjectPaginationProps) => (
  <div sx={{ mt: 6, mb: 4 }}>
    {prev || next?<div sx={{ display: `grid`, gridTemplateColumns: `250px 1fr`, alignItems: `center`, mb: 4 }}>
      <h2
        sx={{
          color: `textMuted`,
          fontWeight: `medium`,
          letterSpacing: `widest`,
          textTransform: `uppercase`,
          fontSize: 1,
          my: 0,
        }}
      >
        More Projects
      </h2>
      <div sx={{ width: `100%`, height: `2px`, backgroundColor: `muted` }} />
    </div>:""}
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: [`1fr`, `1fr`, `1fr 1fr`],
        gridGap: [4, 4, 5],
        a: { position: `relative` },
        "[data-name='card-overlay']": {
          position: `absolute`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
    {prev && [prev].map((project, index) => {
            const val = project.cover.childImageSharp.gatsbyImageData.backgroundColor as string
            const shadow = rgba(val, 0.15)

            const px = [`64px`, `32px`, `16px`, `8px`, `4px`]
            const shadowArray = px.map((v) => `${shadow} 0px ${v} ${v} 0px`)

            return <Card key={project.slug} eager={index === 0} item={project} overlay={val} shadow={shadowArray} />
    })}
    {next && [next].map((project, index) => {
            const val = project.cover.childImageSharp.gatsbyImageData.backgroundColor as string
            const shadow = rgba(val, 0.15)

            const px = [`64px`, `32px`, `16px`, `8px`, `4px`]
            const shadowArray = px.map((v) => `${shadow} 0px ${v} ${v} 0px`)

            return <Card key={project.slug} eager={index === 0} item={project} overlay={val} shadow={shadowArray} />
    })}
    </div>
  </div>
)

export default ProjectPagination
