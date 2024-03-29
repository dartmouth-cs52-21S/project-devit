# DevIt

![DevIt Logo](./images/logo/devit_logo_light_with_bg.png)

## The Team
![Team Photo](./images/team-photo/team_meeting.png)

### Project Description

Devit is a community platform focused on facilitating connections between developers, desginers and innovators. The platform aims at forming teams to help budding designers and engineers gain project experience as well as to help innovators' ideas come to life. The platform consists of a Project page where users are able to post project ideas as well as join onto exisiting projects. Devit also provides a platform for users to keep track of their projects and earn badges as they make more progress. 

![Find a Project Mockup](./images/mockups/find_a_project.png)

### Complete figma mockup 

[Figma mockup](https://www.figma.com/file/6sZtOJFTGTyQ3ugzVtJsVW/HiFi-Sketches?node-id=0%3A1)


## Architecture

### Tools
| Purpose                   | Library                        | Comments                                                                                             |
|---------------------------|--------------------------------|------------------------------------------------------------------------------------------------------|
| Routing                   | React Router, React Router DOM | Enables serving up different components based on our own static/dynamic routes                       |
| State Management          | Redux, React Redux             | Provides subscription-based state and helps avoid prop-drilling                                      |
| Data Fetching             | Axios                          | Straightforward syntax for fetching data over HTTP                                                   |
| Asynchronous Stat Updates | Redux Thunk                    | ⚡️ Supercharges Redux store so it can handle functions, enabling state updates with asynchronous data  |

## Setup

1. Clone Project
2. Run `npm i` to install project dependencies
3. Run `npm start` to start the project at `http://localhost:8080`

## Deployment

### Deploying the Client

_DevIt_ is hosted on Netlify using continuous deployment on the `master` branch.

[devit-21s.netlify.app](devit-21s.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/333af860-cc70-4ceb-8ffb-729bd4cba9be/deploy-status)](https://app.netlify.com/sites/devit-21s/deploys)

### Deploying the Server

The _DevIt API_ is hosted on Netlify using continuous deployment on the `master` branch of the [_DevIt API_ repository](https://github.com/dartmouth-cs52-21S/project-api-devit).


## Authors

- [Lily Maechling](https://github.com/lilymaechling)
- [Scott Gibbons](https://github.com/ScottGibbons00)
- [Henry Mans](https://github.com/henrymans)
- [Nina Paripovic](https://github.com/ninaparipovic)
- [San'Quan Prioleau](https://github.com/sprioleau)

## Acknowledgments
