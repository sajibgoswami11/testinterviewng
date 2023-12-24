import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleCreateComponent } from './module-create/module-create.component';
import { ModuleEditComponent } from './module-edit/module-edit.component';
const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Module'
        },
        children: [
            {
                path: 'list',
                component: ModuleListComponent,
                data: {
                    title: 'Task Module List'
                }
            },
            {
                path: 'create',
                component: ModuleCreateComponent,
                data: {
                    title: 'Task Module Create'
                }
            },
            {
                path: 'edit',
                component: ModuleEditComponent,
                data: {
                    title: 'Task Module Edit'
                }
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskmoduleRouting { }
