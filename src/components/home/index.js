import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

import communityIcon from "Images/icon_community.svg"
import educationIcon from "Images/icon_education.svg"
import inclusionIcon from "Images/icon_inclusion.svg"
import innovationIcon from "Images/icon_innovation.svg"
import talentIcon from "Images/icon_talent.svg"
import {
  Collaboration,
  CollabIcon,
  Description,
  HomeTitle,
  PillarDescription,
  PillarIcon,
  PillarRow,
  ThreeStep,
  WhatIsSDTH
} from "./styles"

const pillarIcons = {
  community: communityIcon,
  education: educationIcon,
  inclusion: inclusionIcon,
  innovation: innovationIcon,
  talent: talentIcon
}

function Home() {
  const {
    markdownRemark: { frontmatter },
    ...icons
  } = useStaticQuery(homeQuery)

  return (
    <main>
      <HomeTitle>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <WhatIsSDTH>
            <div style={{ maxWidth: "570px", zIndex: 2 }}>
              <h2 style={{ color: "white" }}>
                {frontmatter.firstSectionTitle}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: frontmatter.firstSectionDescription
                }}
                style={{ fontSize: "1.5rem" }}
              />
            </div>
          </WhatIsSDTH>
        </div>
      </HomeTitle>
      <Collaboration>
        <h2>{frontmatter.secondSectionTitle}</h2>
        <Description
          dangerouslySetInnerHTML={{
            __html: frontmatter.secondSectionDescription
          }}
        />
      </Collaboration>

      <ThreeStep>
        <aside style={{ maxWidth: "1200px" }}>
          {frontmatter.secondSectionItems.map((c, i) => {
            const icon = icons[c.title]

            return (
              <div key={c.title}>
                <CollabIcon>
                  <Img fluid={icon.childImageSharp.fluid} alt={c.title} />
                </CollabIcon>
                <h3>
                  {i + 1}. {c.title}
                </h3>

                <p className="description">{c.description}</p>
              </div>
            )
          })}
        </aside>
      </ThreeStep>

      <PillarDescription>
        <h2>{frontmatter.thirdSectionTitle}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: frontmatter.thirdSectionDescription
          }}
        />
      </PillarDescription>
      <PillarRow>
        {frontmatter.thirdSectionItems.map(pillar => (
          <PillarIcon
            to={`/${pillar.title}`}
            key={pillar.title}
            background={pillar.background}
          >
            <div>
              <img
                alt={pillar.title}
                src={pillarIcons[pillar.title]}
                height="75"
              />
              <h4>{pillar.title}</h4>
            </div>
            <p>{pillar.description}</p>
          </PillarIcon>
        ))}
      </PillarRow>
    </main>
  )
}

export default Home

const homeQuery = graphql`
  query HOME_QUERY {
    markdownRemark(frontmatter: { path: { eq: "home" } }) {
      frontmatter {
        firstSectionTitle
        firstSectionDescription
        secondSectionTitle
        secondSectionDescription
        secondSectionItems {
          title
          description
        }
        thirdSectionTitle
        thirdSectionDescription
        thirdSectionItems {
          title
          description
          background
        }
      }
    }

    connect: file(relativePath: { eq: "connect-new.png" }) {
      ...childSharp
    }

    empower: file(relativePath: { eq: "empower-new.png" }) {
      ...childSharp
    }
    inform: file(relativePath: { eq: "inform-new.png" }) {
      ...childSharp
    }
  }
`

export const fragment = graphql`
  fragment childSharp on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
