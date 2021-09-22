import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'datatables',
    loadChildren: () => import('../../data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../../chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'projectList',
    loadChildren: () => import('../../project/project-list/project-list.module').then(m => m.ProjectListModule)
  },
  {
    path: 'projectNew',
    loadChildren: () => import('../../project/project-new/project-new.module').then(m => m.ProjectNewModule)
  },
  {
    path: 'bidproject',
    loadChildren: () => import('../../project/newprojectbid/newprojectbid.module').then(m => m.NewprojectbidModule)
  },
  {
    path: 'projectdetail',
    loadChildren: () => import('../../project/projectbids/projectbid.module').then(m => m.ProjectbidModule)
  }
];
