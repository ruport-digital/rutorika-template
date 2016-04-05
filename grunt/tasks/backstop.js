module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      'backstop_path': 'node_modules/backstopjs',
      'test_path': project.tests.backstop
    },
    test: {
      options: {
        setup: false,
        configure: false,
        'create_references': false,
        'run_tests': true
      }
    },
    ref: {
      options: {
        setup: false,
        configure: false,
        'create_references': true,
        'run_tests': false
      }
    }
  };

};
