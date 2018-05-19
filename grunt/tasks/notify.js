module.exports = (grunt, options) => {
  const { project } = options;

  return {
    watch_html: {
      options: {
        title: 'Development',
        message: 'HTML has been compiled',
      },
    },
    watch_images: {
      options: {
        title: 'Development',
        message: 'Images have been processed',
      },
    },
    watch_sass: {
      options: {
        title: 'Development',
        message: 'Styles have been compiled',
      },
    },
    watch_javascript: {
      options: {
        title: 'Development',
        message: 'JavaScript has been transpiled',
      },
    },
    watch_service: {
      options: {
        title: 'Development',
        message: 'Service Worker has been copied',
      },
    },
    connect_start: {
      options: {
        title: 'Development',
        message: `Server has been started on http://localhost:${project.port}`,
      },
    },
    build: {
      options: {
        title: 'Build',
        message: 'Successful build',
      },
    },
  };
};
