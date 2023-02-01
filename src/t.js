let obj = {
    'autoMLJobDetail': {
        'id': 'aut-rcyyu5ngxq2gfdz4',
        'name': 'aaaaaaaaa',
        'projectId': 'proj-3hl5m57lhreae0r6',
        'creatorId': 'w_10101010101',
        'creatorName': 'adminNew',
        'taskType': 'cluster',
        'sceneType': 'cluster',
        'volumeId': 'v-7fc9fhamsjchm6co',
        'experimentId': 'exp_v2-en5jkyxtwgs27i3a',
        'experimentName': '自动化测试实验',
        'experimentDescription': '',
        'runId': 'run-nt3vwhvpqwda7inc',
        'resource': {
            'minCpu': 5,
            'maxCpu': 10,
            'minMemory': 5,
            'maxMemory': 10,
            'computeResourceId': 'cr-qi59z5bsxngy60qm'
        },
        'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/org/proj-3hl5m57lhreae0r6/automl/aut-rcyyu5ngxq2gfdz4',
        'objectiveConfig': {
            'scene': 'cluster',
            'targetColumn': 'EDUCATION',
            'positiveLabel': '',
            'optimizeMetric': 'silhouette_score',
            'featureColumns': [
                'SEX',
                'LIMIT_BAL',
                'MARRIAGE',
                'BILL_AMT1',
                'AGE'
            ],
            'reportMetrics': [
                'calinski_harabasz_score',
                'davies_bouldin_score'
            ]
        },
        'stopConfig': {
            'maxTime': 240,
            'maxTrialCount': 10,
            'useMetricThreshold': false,
            'metricThreshold': 0
        },
        'datasetConfig': {
            'datasetId': 'ds-bfncqn6j9m42kbkk',
            'datasetName': 'v_uci',
            'isProjectDataset': true
        },
        'pipelineConfig': {
            'pipeline': [
                'split',
                'tune'
            ],
            'split': {
                'dataSplitMode': 'Ratio',
                'crossValidationFold': 0,
                'splitRatio': 0.8
            },
            'tune': {
                'algoSelect': {
                    'id': 'hamlet',
                    'name': null,
                    'configs': {
                        'iter_init_ratio': 0.25
                    }
                },
                'hpo': {
                    'id': 'BOHB',
                    'name': null,
                    'configs': {
                        'eta': 3,
                        'max_budget': 32,
                        'min_budget': 1,
                        'optimize_mode': 'maximize'
                    }
                },
                'algorithms': [
                    {
                        'id': 'kmeans_cluster',
                        'name': 'KMeans聚类',
                        'configs': {
                            'max_iter': {
                                '_type': 'quniform',
                                '_value': [
                                    150,
                                    350,
                                    2
                                ]
                            },
                            'n_clusters': {
                                '_type': 'randint',
                                '_value': [
                                    4,
                                    32
                                ]
                            },
                            'n_init': {
                                '_type': 'randint',
                                '_value': [
                                    8,
                                    15
                                ]
                            },
                            'tol': {
                                '_type': 'uniform',
                                '_value': [
                                    0.01,
                                    0.2
                                ]
                            }
                        }
                    }
                ]
            }
        },
        'tuningProgress': 0,
        'step': '',
        'description': '',
        'status': 'Succeed',
        'errMessage': '',
        'createTime': '2022-11-04T02:49:58Z',
        'startTime': '2022-11-04T02:49:58Z',
        'endTime': '2022-11-04T02:55:08Z',
        'duration': 310
    },
    'actions': {},
    'metricList': [
        {
            'name': 'calinski_harabasz_score',
            'label': 'CH指数'
        },
        {
            'name': 'silhouette_score',
            'label': '轮廓系数'
        },
        {
            'name': 'davies_bouldin_score',
            'label': '戴维森堡丁指数'
        }
    ],
    'decimalCount': 4,
    'algorithmList': [
        {
            'label': 'KMeans聚类',
            'value': 'KMeans聚类'
        }
    ],
    'modelDataSource': [
        {
            'id': 'mv-qh8va8kzhwkrevhf',
            'name': 'SklearnKMeans9',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-rd73v7mwkqx1gd7x',
            'runName': 'trial9',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-rd73v7mwkqx1gd7x/artifact/art-8acjvu8rs3psyw4g',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:54:43Z',
            'updateTime': '2022-11-04T02:54:43Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '220',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '31',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '10',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.19122945552438003',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'calinski_harabasz_score',
                    'value': 6612.948926483666,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.31283283355849045,
                    'displayName': '轮廓系数'
                },
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.046301680637222,
                    'displayName': '戴维森堡丁指数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-9rvdg0xa38kjjj7s',
            'name': 'SklearnKMeans8',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-zmpqacn2kx8gpiag',
            'runName': 'trial8',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-zmpqacn2kx8gpiag/artifact/art-82a4cqdbdubh2nmb',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:54:20Z',
            'updateTime': '2022-11-04T02:54:20Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '248',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '29',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '8',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.06196362166307443',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'calinski_harabasz_score',
                    'value': 6753.671417621304,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.1029619516186457,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.3170042434654839,
                    'displayName': '轮廓系数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-q1m8cq7aqazp83nd',
            'name': 'SklearnKMeans7',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-pf9bprdgc17pbb1u',
            'runName': 'trial7',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-pf9bprdgc17pbb1u/artifact/art-s7x6aik6i9kkbpa1',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:54:19Z',
            'updateTime': '2022-11-04T02:54:19Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '334',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '10',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '10',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.0963012442273417',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'silhouette_score',
                    'value': 0.32886379230286766,
                    'displayName': '轮廓系数'
                },
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.0525435738291704,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'calinski_harabasz_score',
                    'value': 7956.845311328169,
                    'displayName': 'CH指数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-dstxu6aebf3wu6w1',
            'name': 'SklearnKMeans6',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-gc0mzqyqgtu6wgb5',
            'runName': 'trial6',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-gc0mzqyqgtu6wgb5/artifact/art-7e1npm8r02sqx98w',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:54:12Z',
            'updateTime': '2022-11-04T02:54:12Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '174',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '18',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '14',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.08311439635290094',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'davies_bouldin_score',
                    'value': 0.9885170391752371,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'calinski_harabasz_score',
                    'value': 7794.148311844684,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.3464641099841739,
                    'displayName': '轮廓系数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-t5rn3ght71xqgcpw',
            'name': 'SklearnKMeans5',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-r8vn192977fakky3',
            'runName': 'trial5',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-r8vn192977fakky3/artifact/art-c3ykm20ydtqb27fi',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:53:46Z',
            'updateTime': '2022-11-04T02:53:46Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '348',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '5',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '11',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.18443504979247802',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.2186292982534452,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.32835396242116954,
                    'displayName': '轮廓系数'
                },
                {
                    'key': 'calinski_harabasz_score',
                    'value': 9274.74234111678,
                    'displayName': 'CH指数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-8nnwjwe5v34pas3p',
            'name': 'SklearnKMeans4',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-2f4p2dxtmi3kxi2d',
            'runName': 'trial4',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-2f4p2dxtmi3kxi2d/artifact/art-f102s6zfktk6mm2m',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:53:43Z',
            'updateTime': '2022-11-04T02:53:43Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '324',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '18',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '10',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.05326919321730445',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.0359253493963294,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'calinski_harabasz_score',
                    'value': 7625.427901558025,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.35433514755919876,
                    'displayName': '轮廓系数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-gmcxnqvz6euey8yh',
            'name': 'SklearnKMeans3',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-3jjettm83b8bb4xi',
            'runName': 'trial3',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-3jjettm83b8bb4xi/artifact/art-1tz9eceu7tyittt3',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:53:38Z',
            'updateTime': '2022-11-04T02:53:38Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '308',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '10',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '11',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.03565173324124331',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'calinski_harabasz_score',
                    'value': 7854.180769788583,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.32543913008868813,
                    'displayName': '轮廓系数'
                },
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.1835070168289978,
                    'displayName': '戴维森堡丁指数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-173gci6j1bxyrcar',
            'name': 'SklearnKMeans0',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-a42yjzgtzkrf89es',
            'runName': 'trial0',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-a42yjzgtzkrf89es/artifact/art-eg2shasf52y6rmsn',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:53:10Z',
            'updateTime': '2022-11-04T02:53:10Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '350',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '16',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '11',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.019600004291244935',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'calinski_harabasz_score',
                    'value': 7828.459980917939,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.3541991558697061,
                    'displayName': '轮廓系数'
                },
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.0146407447154022,
                    'displayName': '戴维森堡丁指数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-hfxqccui17px7ifi',
            'name': 'SklearnKMeans1',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-tap3nu3gvpe4uunj',
            'runName': 'trial1',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-tap3nu3gvpe4uunj/artifact/art-e0wyrnhtf4fyccvq',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:53:10Z',
            'updateTime': '2022-11-04T02:53:10Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '190',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '22',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '14',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.06109405163818852',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.0394725009006551,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'calinski_harabasz_score',
                    'value': 7433.174162466025,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.3233157075354896,
                    'displayName': '轮廓系数'
                }
            ],
            'tags': null
        },
        {
            'id': 'mv-22y8wavw60m3y6t1',
            'name': 'SklearnKMeans2',
            'algoCategory': '聚类算法',
            'algoFramework': '其他',
            'algorithm': 'KMeans聚类',
            'expId': 'exp_v2-en5jkyxtwgs27i3a',
            'expName': '自动化测试实验',
            'runId': 'run-myzrqdg6r7gcr4uu',
            'runName': 'trial2',
            'runType': 'autoMLTrial',
            'artifactType': null,
            'volumeId': 'v-7fc9fhamsjchm6co',
            'baseDir': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co',
            'outputPath': '/home/bml/storage/mnt/v-7fc9fhamsjchm6co/_system_/modelengine/proj-3hl5m57lhreae0r6/experimentV2/exp_v2-en5jkyxtwgs27i3a/expRun/run-myzrqdg6r7gcr4uu/artifact/art-phskv3ryj908mr6a',
            'hasPublished': false,
            'projectId': 'proj-3hl5m57lhreae0r6',
            'organizationId': 'org-iojpup9vc57z7y6f',
            'creator': 'adminNew',
            'creatorId': 'w_10101010101',
            'createTime': '2022-11-04T02:53:05Z',
            'updateTime': '2022-11-04T02:53:05Z',
            'paramList': [
                {
                    'key': 'TRIAL_BUDGET',
                    'value': '1',
                    'displayName': 'TRIAL_BUDGET'
                },
                {
                    'key': 'max_iter',
                    'value': '348',
                    'displayName': 'max_iter'
                },
                {
                    'key': 'n_clusters',
                    'value': '29',
                    'displayName': 'n_clusters'
                },
                {
                    'key': 'n_init',
                    'value': '13',
                    'displayName': 'n_init'
                },
                {
                    'key': 'tol',
                    'value': '0.09138428465768293',
                    'displayName': 'tol'
                },
                {
                    'key': 'MODELCLASS',
                    'value': 'SklearnKMeans',
                    'displayName': 'MODELCLASS'
                }
            ],
            'metricList': [
                {
                    'key': 'calinski_harabasz_score',
                    'value': 6855.620673248439,
                    'displayName': 'CH指数'
                },
                {
                    'key': 'davies_bouldin_score',
                    'value': 1.0347641202570568,
                    'displayName': '戴维森堡丁指数'
                },
                {
                    'key': 'silhouette_score',
                    'value': 0.3219502630688251,
                    'displayName': '轮廓系数'
                }
            ],
            'tags': null
        }
    ],
    'metricDataSource': [
        {
            'key': 'calinski_harabasz_score',
            'value': 6612.948926483666,
            'displayName': 'CH指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.31283283355849045,
            'displayName': '轮廓系数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.046301680637222,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 6753.671417621304,
            'displayName': 'CH指数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.1029619516186457,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.3170042434654839,
            'displayName': '轮廓系数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.32886379230286766,
            'displayName': '轮廓系数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.0525435738291704,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 7956.845311328169,
            'displayName': 'CH指数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 0.9885170391752371,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 7794.148311844684,
            'displayName': 'CH指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.3464641099841739,
            'displayName': '轮廓系数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.2186292982534452,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.32835396242116954,
            'displayName': '轮廓系数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 9274.74234111678,
            'displayName': 'CH指数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.0359253493963294,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 7625.427901558025,
            'displayName': 'CH指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.35433514755919876,
            'displayName': '轮廓系数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 7854.180769788583,
            'displayName': 'CH指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.32543913008868813,
            'displayName': '轮廓系数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.1835070168289978,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 7828.459980917939,
            'displayName': 'CH指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.3541991558697061,
            'displayName': '轮廓系数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.0146407447154022,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.0394725009006551,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 7433.174162466025,
            'displayName': 'CH指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.3233157075354896,
            'displayName': '轮廓系数'
        },
        {
            'key': 'calinski_harabasz_score',
            'value': 6855.620673248439,
            'displayName': 'CH指数'
        },
        {
            'key': 'davies_bouldin_score',
            'value': 1.0347641202570568,
            'displayName': '戴维森堡丁指数'
        },
        {
            'key': 'silhouette_score',
            'value': 0.3219502630688251,
            'displayName': '轮廓系数'
        }
    ]
}