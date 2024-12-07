import React from 'react';
import QuestionList from './QuestionList';
import AdvancedSearch from './AdvancedSearch';
import BulkActions from './BulkActions';

const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <span className="navbar-brand">Quiz Markets Admin</span>
                </div>
            </nav>
            <div className="row">
                <div className="col-md-3">
                    <AdvancedSearch />
                </div>
                <div className="col-md-9">
                    <BulkActions />
                    <QuestionList />
                </div>
            </div>
        </div>
    );
};