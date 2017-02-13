import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let links = [
      {
        id: 1,
        ownerId: 1,
        title: 'How To Create a Login Form',
        description: 'How To Create a Login Form',
        url: 'http://www.w3schools.com/howto/howto_css_login_form.asp',
        tags: ['html5', 'howto', 'create', 'login', 'form', 'tutorial']
      },
      {
        id: 2,
        ownerId: 2,
        title: '18. Cross Site Request Forgery (CSRF)',
        description: 'cross site request forgery description and protection with spring security',
        url: 'https://docs.spring.io/spring-security/site/docs/current/reference/html/csrf.html',
        tags: ['csfr', 'protection', 'why', 'description', 'spring', 'prevent', 'enable', 'configuration', 'security']
      },
      {
        id: 3,
        ownerId: 1,
        title: 'gruntjs - NPM vs. Bower vs. Browserify vs. Gulp vs. Grunt vs. Webpack - Stack Overflow',
        description: 'overview of modern javascript packagers and others',
        url: 'http://stackoverflow.com/questions/35062852/npm-vs-bower-vs-browserify-vs-gulp-vs-grunt-vs-webpack',
        tags: ['javaScript', 'ecosystem', 'tools', 'administration', 'management', 'list', 'stackoverflow', 'usage', 'differences', 'introduction', 'overview']
      },
      {
        id: 4,
        ownerId: 1,
        title: 'GitHub - angular/in-memory-web-api',
        description: '',
        url: 'https://github.com/angular/in-memory-web-api',
        tags: ['angular2', 'memory', 'web', 'api', 'service', 'mocking', 'testing', 'emulate', 'database', 'JavaScript']
      },
      {
        id: 5,
        ownerId: 1,
        title: 'Copy And Paste Between VirtualBox Host And Guest Machines – Liberian Geek',
        description: '',
        url: 'https://www.liberiangeek.net/2013/09/copy-paste-virtualbox-host-guest-machines/',
        tags: ['virtualbox', 'copy', 'paste', 'between', 'guest', 'and', 'host', 'virtualization']
      },
      {
        id: 6,
        ownerId: 2,
        title: 'Install EPEL, IUS, and Remi repositories on CentOS and Red Hat',
        description: 'sudo yum install epel-release',
        url: 'https://support.rackspace.com/how-to/install-epel-and-additional-repositories-on-centos-and-red-hat/',
        tags: ['easiest', 'way', 'install', 'epel', 'centos', '7', 'extra', 'repositories', 'additional', 'linux', 'administration', 'system']
      },
      {
        id: 7,
        ownerId: 3,
        title: '50+ Social Bookmarking Sites : Importance of User Generated Tags, Votes, and Links - Search Engine Journal',
        description: '',
        url: 'https://www.searchenginejournal.com/50-social-bookmarking-sites-importance-of-user-generated-tags-votes-and-links/6066/',
        tags: ['social', 'bookmarking', 'freelancing', 'personal', 'project', 'ideas', 'idea', 'tools', 'bookmark', 'list', 'important', 'sites']
      },
    ];
    return { links };
  }
}
