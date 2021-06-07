import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faSlack, faGithub, faFigma } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

import { fetchProject, toggleModalVisibility, updateProject, updateUser } from '../store/actions';
import Calendar from './Calendar';
import Chat from './Chat';
import { ModalMessage } from './Modal';
import { selectisAuthenticated, selectUser } from '../store/selectors';
import getCommits from '../services/github-api';

const Project = () => {
  const [project, setProject] = useState();
  const [isMember, setIsMember] = useState(false);
  const [projectCommits, setProjectCommits] = useState([]);

  const [editingSlack, setEditingSlack] = useState(false);
  const [editingFigma, setEditingFigma] = useState(false);
  const [editingGitHub, setEditingGitHub] = useState(false);

  const [SlackEdit, setSlackEdit] = useState('');
  const [FigmaEdit, setFigmaEdit] = useState('');
  const [GitHubEdit, setGitHubEdit] = useState('');
  const [GitHubLabelEdit, setGitHubLabelEdit] = useState('');

  const [toggleRecentActivity, setToggleRecentActivity] = useState(true);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectisAuthenticated);
  const history = useHistory();

  // should I be using data.Slack here or project.Slack??
  useEffect(() => {
    dispatch(fetchProject(projectId, (data) => {
      setProject(data);
      setSlackEdit('');
      setFigmaEdit('');
      setGitHubEdit('');
      setGitHubLabelEdit('');

      if (data.GitHub.length === 0) {
        setProjectCommits(['You have no recent activity']);
      } else {
        data.GitHub.map((git) => {
          const index = git.indexOf('github.com/') + 'github.com/'.length;
          const repo = git.substring(index);

          getCommits(repo).then((commits) => {
            const newArray = commits.map((com) => {
              const author = com.author ? com.author.login : 'unknown';
              const { message } = com.commit;
              const { date } = com.commit.author;
              return { author, message, date };
            });

            setProjectCommits(newArray);
          });

          return '';
        });
      }
      let i = 0;
      if (data?.author?.id === user.id) {
        setIsMember(true);
      } else {
        while (i < data.team.length) {
          if (data.team[i].id === user.id || data.team[i] === user.id) {
            setIsMember(true);
            break;
          }

          i += 1;
        }
      }
    }));
  }, []);


  if (!project) return 'Sorry, we couldn\'t find that project.';

  const editModeSlack = () => { setEditingSlack(true); };

  const disableEditModeSlack = () => { setEditingSlack(false); };

  const editModeFigma = () => { setEditingFigma(true); };

  const disableEditModeFigma = () => { setEditingFigma(false); };

  const editModeGitHub = () => { setEditingGitHub(true); };

  const disableEditModeGitHub = () => { setEditingGitHub(false); };

  const submitFigmaEdits = () => {
    const newfig = project.Figma;
    newfig.push(FigmaEdit);
    setFigmaEdit('');
    dispatch(updateProject({ Figma: newfig }, project.id));
    setEditingFigma(false);
  };

  const submitSlackEdits = () => {
    const newSlack = project.Slack;
    newSlack.push(SlackEdit);
    setSlackEdit('');
    dispatch(updateProject({
      Slack: newSlack,
    }, project.id));
    setEditingSlack(false);
  };

  const submitGitHubEdits = () => {
    const newGitHub = project.GitHub;
    newGitHub.push(GitHubEdit);
    const newGitHubLabel = project.GitHubLabel;
    newGitHubLabel.push(GitHubLabelEdit);
    setGitHubEdit('');
    setGitHubLabelEdit('');
    dispatch(updateProject({
      GitHub: newGitHub,
      GitHubLabel: newGitHubLabel,
    }, project.id));
    setEditingGitHub(false);
  };

  const clickUser = (id) => {
    history.push(`/users/${id}`);
  };

  const industries = project.industry ? (project.industry.map((item) => (
    <p key={item} className="project__industry__tag">{item}</p>
  )))
    : null;

  const neededTeam = project.neededTeam ? (project.neededTeam.map((item) => {
    const designer = 'designer';
    const developer = 'developer';

    if (designer.match(item)) {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="designer__needed" />
          <p>{item}</p>
        </div>
      );
    } else if (developer.match(item)) {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="developer__needed" />
          <p>{item}</p>
        </div>
      );
    } else {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="ideator__needed" />
          <p>{item}</p>
        </div>
      );
    }
  }))
    : null;

  const team = (project.team && project.team[0]) ? (project.team.map((item) => {
    if (item.id !== project.author?.id) {
      return (
        <div className="team__item" key={item.id}>
          <p onClick={() => clickUser(item.id)}>{item.firstName} {item.lastName}</p>
        </div>
      );
    } else {
      return null;
    }
  }))
    : null;

  const fullteam = () => {
    if (project.author) {
      return (
        <ul id="members__container">
          <h2>Author:</h2>
          <div className="team__item" key={project.author.id}>
            <p onClick={() => clickUser(project.author.id)}>{project.author.firstName} {project.author.lastName}</p>
          </div>
          <h2>Current Team Members:</h2>
          {team}
        </ul>

      );
    } else {
      return null;
    }
  };

  const handleToggleModal = () => dispatch(toggleModalVisibility(
    <ModalMessage
      title="Team Best Practices"
      message="Don't know where to start when building your team? Check out this link to get you started."
      linkHref="https://yourstory.com/2019/06/build-team-for-startup/amp"
      target="_blank"
      linkText="Team Best Practices"
    />,
  ));

  const joinProject = () => {
    if (isAuthenticated) {
      if (isMember) {
        toast.dark('You are already a member of this project!');
      } else {
        // add the user to the project
        const newProj = project;
        const newteam = [];
        let i = 0;

        while (i < project.team.length) {
          newteam.push(project.team[i].id);
          i += 1;
        }
        newteam.push(user.id);
        newProj.team = newteam;
        setProject(newProj);
        setIsMember(true);

        dispatch(updateProject({ team: newteam }, newProj.id));

        // add the project to the user
        const newUser = user;
        const newprojects = user.projects;
        newprojects.push(project.id);
        newUser.projects = newprojects;
        if (!user.projectsJoined) {
          newUser.projectsJoined = 0;
        }
        newUser.projectsJoined = user.projectsJoined + 1;
        dispatch(updateUser(user.id, newUser));

        toast.dark('You have joined the project! Refresh to see updates');
      }
    } else {
      history.push('/signup');
    }
  };
  const renderActivity = () => {
    if (projectCommits[0] === 'You have no recent activity') {
      return <h3>You have no recent activity</h3>;
    } else if (projectCommits && projectCommits.length > 0) {
      const activity = projectCommits.map((commit) => {
        const date = commit.date.substring(0, 10);
        const time = commit.date.substring(commit.date.indexOf('T') + 1, commit.date.indexOf('T') + 9);
        return (
          <div className="activity" key={commit.message}>
            <h3 className="commit">Commit from {commit.author}, on {date}, at {time}</h3>
            <p className="commit">{commit.message}</p>
          </div>
        );
      });
      return activity;
    }
    return '';
  };

  const renderFigmaLink = (project.Figma.length === 0)
    ? <div role="button" tabIndex={0} className="add__link" onClick={editModeFigma}>Add Figma Link</div>
    : (project.Figma.map((link) => (
      <a key={link} className="project__links" target="_blank" href={link} rel="noreferrer">Figma</a>
    ))
    );

  const renderGitHubLink = (project.GitHub.length === 0) ? null : (
    project.GitHub.map((link, i) => (
      <a key={link} className="project__links" target="_blank" href={link} rel="noreferrer">{project.GitHubLabel[i]}</a>
    ))
  );

  const renderSlackLink = (project.Slack.length === 0)
    ? <div role="button" tabIndex={0} className="add__link" onClick={editModeSlack}>Add Slack Link</div>
    : (
      project.Slack.map((link) => (
        <a key={link} className="project__links" target="_blank" href={link} rel="noreferrer">Slack</a>
      ))
    );

  const renderLinksSlack = (editingSlack)
    ? (
      <div>
        <div className="link-flex-container">
          <FontAwesomeIcon icon={faSlack} className="link" />
          <textarea rows="1" value={SlackEdit} className="input-new-link" placeholder="Add a Slack Channel" onChange={(e) => setSlackEdit(e.target.value)} />
          <button type="button" className="link-add-button" onClick={submitSlackEdits}>Add</button>
          <button type="button" className="link-add-button" onClick={disableEditModeSlack}>Cancel</button>

        </div>
      </div>
    ) : (
      <div>
        <div className="link-flex-container">
          <FontAwesomeIcon icon={faSlack} className="link" />
          {renderSlackLink}
        </div>
      </div>
    );

  const renderLinksFigma = (editingFigma)
    ? (
      <div>
        <div className="link-flex-container">
          <FontAwesomeIcon icon={faFigma} className="link" />
          <textarea value={FigmaEdit} className="input-new-link" placeholder="Add a Figma Link" onChange={(e) => setFigmaEdit(e.target.value)} />
          <button type="button" className="link-add-button" onClick={submitFigmaEdits}>Add</button>
          <button type="button" className="link-add-button" onClick={disableEditModeFigma}>Cancel</button>
        </div>
      </div>
    ) : (
      <div>
        <div className="link-flex-container">
          <FontAwesomeIcon icon={faFigma} className="link" />
          {renderFigmaLink}
        </div>
      </div>
    );

  const renderLinksGitHub = (editingGitHub)
    ? (
      <div>
        <div className="link-flex-container">
          <FontAwesomeIcon icon={faGithub} className="link" />
          {renderGitHubLink}
          <textarea className="input-new-link" value={GitHubEdit} placeholder="Add a public GitHub Repository" onChange={(e) => setGitHubEdit(e.target.value)} />
          <textarea className="input-new-link" value={GitHubLabelEdit} placeholder="Add Repository Title" onChange={(e) => setGitHubLabelEdit(e.target.value)} />

          <button type="button" className="link-add-button" onClick={submitGitHubEdits}>Add</button>
          <button type="button" className="link-add-button" onClick={disableEditModeGitHub}>Cancel</button>

        </div>
      </div>
    ) : (
      <div>
        <div className="link-flex-container">
          <FontAwesomeIcon icon={faGithub} className="link" />
          {renderGitHubLink}
          <div role="button" tabIndex={0} className="add__link" onClick={editModeGitHub}>Add GitHub Link</div>
        </div>
      </div>
    );

  return (
    <div>
      <div>
        <div className="project">
          <div className="project__details">
            <div id="project__title__container">
              <div className="project__logo">{project.logo}</div>
              <h1 className="project__title">{project.name}</h1>
            </div>
            <p>{project.bio}</p>
            <ul>
              {industries}
            </ul>
            <div className="row">
              {(!isMember)
                ? (
                  <button type="button" className="button" onClick={joinProject}>
                    Join Team
                  </button>
                )
                : <div> </div>}
            </div>
            {renderLinksSlack}
            {renderLinksFigma}
            {renderLinksGitHub}
            <div id="best__practices">
              <FontAwesomeIcon className="icon" id="light" icon={faLightbulb} />
              <button type="button" className="project__links" onClick={handleToggleModal}>Best Team Practices</button>
            </div>
            <h3>Current team:</h3>
            {fullteam()}
            <ul className="neededTeam__container">
              {neededTeam}
            </ul>
            <div className="project__tools">
              <div className="tabs__container">
                <label className={`form__label checkbox-label ${toggleRecentActivity ? 'checked' : ''}`} htmlFor="Recent Activity">
                  <p className="form__label-text checkbox-label-text">Recent Activity</p>
                  <input
                    id="Recent Activity"
                    className="form__checkbox"
                    type="checkbox"
                    value="Recent Activity"
                    checked={toggleRecentActivity}
                    onChange={() => setToggleRecentActivity(!toggleRecentActivity)}
                  />
                </label>
                <label className={`form__label checkbox-label ${!toggleRecentActivity ? 'checked' : ''}`} htmlFor="Calendar">
                  <p className="form__label-text checkbox-label-text">Calendar</p>
                  <input
                    id="Calendar"
                    className="form__checkbox"
                    type="checkbox"
                    value="Calendar"
                    checked={!toggleRecentActivity}
                    onChange={() => setToggleRecentActivity(!toggleRecentActivity)}
                  />
                </label>
              </div>
              <div className="tools__container">
                {toggleRecentActivity
                  ? (<div className="activity-container">{renderActivity()}</div>)
                  : (<Calendar project={project} />)}
              </div>
            </div>
          </div>

          <div className="project__chat">
            <Chat />
          </div>
        </div>
      </div>
      <div className="project-questions">
        <h2>What is the problem you are solving? Why is it important?</h2>
        <div className="project-question-container">
          {project.problemDescription}
        </div>
        <h2>What is your target audience?</h2>
        <div className="project-question-container">
          {project.audienceDescription}
        </div>
        <h2>Do you plan to market your idea? What is your going to market strategy?</h2>
        <div className="project-question-container">
          {project.marketDescription}
        </div>
      </div>
    </div>
  );
};

export default Project;
